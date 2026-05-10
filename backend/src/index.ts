import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import { Autosend } from 'autosendjs';

const app = express();
const PORT = process.env.PORT ?? 3001;

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } },
);

const autosend = new Autosend(process.env.AUTOSEND_API_KEY!);
const FROM_EMAIL = process.env.FROM_EMAIL ?? 'hello@nestu.app';
const FROM_NAME = 'NestU';
const CORS_ORIGIN = process.env.FRONTEND_URL ?? 'https://nestu.app';

app.use(cors({ origin: CORS_ORIGIN, methods: ['GET', 'POST'] }));
app.use(express.json({ limit: '16kb' }));

// ---------------------------------------------------------------------------
// Simple in-memory rate limiter: max 5 requests per IP per 60 seconds
// ---------------------------------------------------------------------------
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  if (entry.count >= 5) return true;
  entry.count++;
  return false;
}

// Prune stale entries every 5 minutes to prevent unbounded growth
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}, 300_000);

// ---------------------------------------------------------------------------

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/waitlist', async (req: Request, res: Response) => {
  const ip = (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0]?.trim() ?? req.socket.remoteAddress ?? 'unknown';
  if (isRateLimited(ip)) {
    res.status(429).json({ error: 'Too many requests. Please try again in a minute.' });
    return;
  }

  const { email, name, role, location, referred_by } = req.body ?? {};

  const trimmedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    res.status(400).json({ error: 'Invalid email address' });
    return;
  }
  if (trimmedEmail.length > 254) {
    res.status(400).json({ error: 'Invalid email address' });
    return;
  }

  const trimmedName = typeof name === 'string' ? name.trim().slice(0, 120) || null : null;
  const trimmedRole = typeof role === 'string' ? role.trim().slice(0, 60) || null : null;
  const trimmedLocation = typeof location === 'string' ? location.trim().slice(0, 120) || null : null;
  const trimmedReferredBy = typeof referred_by === 'string' ? referred_by.trim().slice(0, 20) || null : null;

  // Check for duplicate email before inserting
  const { data: existing } = await supabase
    .from('waitlist')
    .select('referral_code')
    .eq('email', trimmedEmail)
    .maybeSingle();

  if (existing) {
    res.json({ success: true, code: 'DUPLICATE', referralCode: existing.referral_code });
    return;
  }

  const referralCode = await generateUniqueReferralCode();
  if (!referralCode) {
    res.status(500).json({ error: 'Could not generate referral code' });
    return;
  }

  const { data: inserted, error: dbError } = await supabase.from('waitlist').insert({
    email: trimmedEmail,
    name: trimmedName,
    role: trimmedRole,
    location: trimmedLocation,
    referred_by: trimmedReferredBy,
    referral_code: referralCode,
  }).select('created_at').single();

  if (dbError) {
    // Race condition: email was inserted between our check and insert
    if ((dbError as { code?: string }).code === '23505' && dbError.message.includes('email')) {
      const { data: race } = await supabase
        .from('waitlist')
        .select('referral_code')
        .eq('email', trimmedEmail)
        .maybeSingle();
      res.json({ success: true, code: 'DUPLICATE', referralCode: race?.referral_code ?? null });
      return;
    }
    console.error('[DB]', dbError.message);
    res.status(500).json({ error: 'Could not save signup' });
    return;
  }

  // Count position (number of rows with created_at <= this row's created_at)
  let position: number | null = null;
  if (inserted?.created_at) {
    const { count } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })
      .lte('created_at', inserted.created_at);
    position = count;
  }

  // Fire confirmation email — non-blocking so the response is fast
  sendConfirmationEmail(trimmedEmail, trimmedName)
    .then((info) => console.log('[Email] sent to', trimmedEmail, JSON.stringify(info)))
    .catch((err: unknown) => console.error('[Email] FAILED to', trimmedEmail, err));

  res.json({ success: true, referralCode, position });
});

app.listen(PORT, () => {
  console.log(`NestU backend listening on port ${PORT}`);
});

// ---------------------------------------------------------------------------

const REFERRAL_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no ambiguous 0/O, 1/I

function generateCode(): string {
  let code = 'NESTU-';
  for (let i = 0; i < 6; i++) {
    code += REFERRAL_CHARS[Math.floor(Math.random() * REFERRAL_CHARS.length)];
  }
  return code;
}

async function generateUniqueReferralCode(): Promise<string | null> {
  for (let attempt = 0; attempt < 8; attempt++) {
    const code = generateCode();
    const { data } = await supabase
      .from('waitlist')
      .select('id')
      .eq('referral_code', code)
      .maybeSingle();
    if (!data) return code;
  }
  return null;
}

async function sendConfirmationEmail(email: string, name: string | null) {
  return autosend.emails.send({
    from: { email: FROM_EMAIL, name: FROM_NAME },
    to: { email, name: name ?? 'there' },
    subject: "You're on the NestU waitlist!",
    text: confirmationText(),
  });
}

function confirmationText(): string {
  return `You're on the NestU waitlist!

Thanks for joining. We'll reach out as soon as we launch at your university.

What NestU lets you do:

- Browse verified listings — every landlord is identity-checked before going live
- Post subleases — list your place for the months you don't need it
- Find roommates — matched by sleep schedule, cleanliness, budget & lifestyle
- No broker fees, no application fees. Free forever.

Aayush Swami
Founder, NestU`;
}
