import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

const BACKEND_BASE = (import.meta.env.VITE_BACKEND_URL as string | undefined) ?? "";

type BackendResult = { ok: boolean; duplicate?: boolean; referralCode?: string; position?: number };
type PageState = "form" | "google-details" | "success" | "oauth-error";

async function postToBackend(payload: {
  email: string; name?: string; role?: string;
  location?: string; referred_by?: string; source: string;
}): Promise<BackendResult> {
  try {
    const res = await fetch(`${BACKEND_BASE}/api/waitlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json() as { success?: boolean; code?: string; referralCode?: string; position?: number; error?: string };
    if (!res.ok && data.code !== "DUPLICATE") return { ok: false };
    return { ok: true, duplicate: data.code === "DUPLICATE", referralCode: data.referralCode, position: data.position };
  } catch { return { ok: false }; }
}

/* ── SVG Icons ── */
const HomeIcon = (p: React.SVGProps<SVGSVGElement>) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>;
const ArrowIcon = (p: React.SVGProps<SVGSVGElement>) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
const CheckIcon = (p: React.SVGProps<SVGSVGElement>) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const CopyIcon = (p: React.SVGProps<SVGSVGElement>) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>;
const ShareIcon = (p: React.SVGProps<SVGSVGElement>) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;
const PinIcon = (p: React.SVGProps<SVGSVGElement>) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const ShieldIcon = (p: React.SVGProps<SVGSVGElement>) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>;
const SparkIcon = (p: React.SVGProps<SVGSVGElement>) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></svg>;
const UsersIcon = (p: React.SVGProps<SVGSVGElement>) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const KeyIcon = (p: React.SVGProps<SVGSVGElement>) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>;

/* ── Logo ── */
function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="34" height="34" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="64" height="64" rx="14" fill="#C75A38" />
        <path d="M19 17 L19 38 Q19 52 32 52 Q45 52 45 38 L45 17 L38 17 L38 38 Q38 45 32 45 Q26 45 26 38 L26 17 Z" fill="#F2ECE2" />
        <ellipse cx="32" cy="41" rx="3.6" ry="4.6" fill={light ? "#C75A38" : "#F2ECE2"} />
      </svg>
      <span style={{ fontFamily: '"Bricolage Grotesque", system-ui, sans-serif', fontWeight: 800, fontSize: '22px', letterSpacing: '-0.04em' }}
        className={light ? "text-[#F2ECE2]" : "text-[#1C1916]"}>
        NestU
      </span>
    </div>
  );
}

/* ── smooth scroll helper ── */
function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: "smooth" });
}

/* ── Nav ── */
function Nav({ onJoin }: { onJoin: () => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E8E3D7]/60 bg-[#FAFAF7]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-7 py-5">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex">
          {[["how", "How it works"], ["features", "Features"], ["schools", "Universities"]].map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)}
              className="text-sm text-[#6B6C66] transition-colors hover:text-[#0E0F0C]">
              {label}
            </button>
          ))}
        </nav>
        <button onClick={onJoin} className="flex items-center gap-2 rounded-[10px] bg-[#0E0F0C] px-4 py-2.5 text-sm font-medium text-[#FAFAF7] transition hover:-translate-y-px hover:shadow-lg active:scale-[0.98]">
          Join waitlist <ArrowIcon className="h-3.5 w-3.5" />
        </button>
      </div>
    </header>
  );
}

/* ── Waitlist Form ── */
const FIELD = "flex flex-col gap-1.5 mb-3.5";
const LABEL = "text-[13px] font-medium text-[#0E0F0C] flex items-center justify-between";
const OPT = "text-[12px] font-normal text-[#95968F]";
const INPUT = "h-11 rounded-[10px] border border-[#E8E3D7] bg-[#FAFAF7] px-3.5 text-sm text-[#0E0F0C] outline-none transition placeholder:text-[#95968F] focus:border-[#C4622D] focus:ring-4 focus:ring-[#C4622D]/18 focus:bg-white";

function WaitlistForm({ onSuccess }: { onSuccess: (r: BackendResult) => void }) {
  const [email, setEmail] = useState(""); const [name, setName] = useState("");
  const [role, setRole] = useState(""); const [location, setLocation] = useState("");
  const [referredBy, setReferredBy] = useState(""); const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false); const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(null);
    const t = email.trim().toLowerCase();
    if (!t || !t.includes("@")) { setError("Please enter a valid email address."); return; }
    setLoading(true);
    const result = await postToBackend({ email: t, name: name.trim() || undefined, role: role || undefined, location: location.trim() || undefined, referred_by: referredBy.trim() || undefined, source: "landing_form" });
    setLoading(false);
    if (!result.ok) { setError("Something went wrong. Please try again."); return; }
    onSuccess(result);
  };

  const handleGoogle = async () => {
    setError(null); setGoogleLoading(true);
    const { error: authError } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: window.location.origin } });
    if (authError) { setGoogleLoading(false); setError("Couldn't sign in with Google. Try the email form below."); }
  };

  return (
    <form onSubmit={submit} className="rounded-[22px] border border-[#E8E3D7] bg-white p-8 shadow-[0_1px_0_rgba(14,15,12,.05),0_18px_40px_-16px_rgba(14,15,12,.14)] relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(196,98,45,.04), transparent 40%, rgba(92,122,90,.04))" }}>
      {/* Google */}
      <button type="button" onClick={handleGoogle} disabled={googleLoading}
        className="mb-1 flex w-full items-center justify-center gap-2.5 rounded-[10px] border border-[#E8E3D7] bg-[#FAFAF7] px-4 py-2.5 text-sm font-medium text-[#0E0F0C] transition hover:bg-[#F1EEE6] hover:border-[#D9D3C3] active:scale-[0.98] disabled:opacity-60">
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.1A6.99 6.99 0 0 1 5.46 12c0-.73.13-1.44.38-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 4.93l3.66-2.83z"/><path fill="#EA4335" d="M12 4.78c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.46 14.97.5 12 .5 7.7.5 3.99 2.97 2.18 6.57l3.66 2.83C6.71 6.71 9.14 4.78 12 4.78z"/></svg>
        {googleLoading ? "Connecting…" : "Continue with Google"}
      </button>

      <div className="my-4 flex items-center gap-3.5 text-[11px] uppercase tracking-[0.14em] text-[#95968F]">
        <span className="h-px flex-1 bg-[#E8E3D7]" /> or with email <span className="h-px flex-1 bg-[#E8E3D7]" />
      </div>

      <div className={FIELD}>
        <label className={LABEL}>Email address</label>
        <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" className={INPUT} />
        <span className="text-[12px] text-[#95968F]">Any email works. School email not required.</span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3.5">
        <div className="flex flex-col gap-1.5">
          <label className={LABEL}>Name <span className={OPT}>optional</span></label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Jordan" className={INPUT} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={LABEL}>I am a…</label>
          <select value={role} onChange={e => setRole(e.target.value)} className={INPUT}>
            <option value="">Select…</option>
            <option>Student</option><option>Intern</option><option>Young professional</option>
            <option>International student</option><option>Landlord</option><option>Other</option>
          </select>
        </div>
      </div>

      <div className={FIELD}>
        <label className={LABEL}>City or university <span className={OPT}>optional</span></label>
        <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. UC Berkeley, Austin TX, New York" className={INPUT} />
      </div>

      <div className={FIELD}>
        <label className={LABEL}>Referral code <span className={OPT}>optional</span></label>
        <input type="text" value={referredBy} onChange={e => setReferredBy(e.target.value.toUpperCase())} placeholder="NESTU-XXXXXX" className={`${INPUT} font-mono tracking-[0.08em] text-[13px]`} />
      </div>

      {error && <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-[13px] text-red-700">{error}</div>}

      <button type="submit" disabled={loading}
        className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-[12px] bg-[#C4622D] text-[15px] font-medium text-white transition hover:-translate-y-px hover:shadow-[0_8px_22px_-8px_rgba(196,98,45,0.7)] active:scale-[0.98] disabled:opacity-60">
        {loading ? "Joining…" : "Get early access"} <ArrowIcon className="h-4 w-4" />
      </button>
      <p className="mt-3.5 text-center text-[12px] text-[#95968F]">No spam. Unsubscribe anytime.</p>
    </form>
  );
}

/* ── Google Details Form ── */
function GoogleDetailsForm({ email, name, onSuccess }: { email: string; name: string; onSuccess: (r: BackendResult) => void }) {
  const [role, setRole] = useState(""); const [location, setLocation] = useState("");
  const [referredBy, setReferredBy] = useState(""); const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(null); setLoading(true);
    const result = await postToBackend({ email, name: name || undefined, role: role || undefined, location: location.trim() || undefined, referred_by: referredBy.trim() || undefined, source: "google_oauth" });
    setLoading(false);
    if (!result.ok) { setError("Something went wrong. Please try again."); return; }
    onSuccess(result);
  };

  return (
    <form onSubmit={submit} className="rounded-[22px] border border-[#E8E3D7] bg-white p-8 shadow-[0_1px_0_rgba(14,15,12,.05),0_18px_40px_-16px_rgba(14,15,12,.14)]">
      <div className="mb-5 flex items-center gap-3 rounded-xl border border-[#5C7A5A]/30 bg-[#5C7A5A]/8 px-4 py-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#5C7A5A] text-white">
          <CheckIcon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-medium text-[#0E0F0C]">Signed in with Google</p>
          <p className="text-xs text-[#6B6C66]">{email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3.5">
        <div className="flex flex-col gap-1.5">
          <label className={LABEL}>I am a…</label>
          <select value={role} onChange={e => setRole(e.target.value)} className={INPUT}>
            <option value="">Select…</option>
            <option>Student</option><option>Intern</option><option>Young professional</option>
            <option>International student</option><option>Landlord</option><option>Other</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={LABEL}>University or city</label>
          <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. UC Berkeley" className={INPUT} />
        </div>
      </div>

      <div className={FIELD}>
        <label className={LABEL}>Referral code <span className={OPT}>optional</span></label>
        <input type="text" value={referredBy} onChange={e => setReferredBy(e.target.value.toUpperCase())} placeholder="NESTU-XXXXXX" className={`${INPUT} font-mono tracking-[0.08em] text-[13px]`} />
      </div>

      {error && <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-[13px] text-red-700">{error}</div>}

      <button type="submit" disabled={loading}
        className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-[12px] bg-[#C4622D] text-[15px] font-medium text-white transition hover:-translate-y-px hover:shadow-[0_8px_22px_-8px_rgba(196,98,45,0.7)] active:scale-[0.98] disabled:opacity-60">
        {loading ? "Joining…" : "Complete signup"} <ArrowIcon className="h-4 w-4" />
      </button>
    </form>
  );
}

/* ── Success State ── */
function SuccessState({ referralCode, position }: { referralCode?: string; position?: number }) {
  const [copied, setCopied] = useState(false);
  const link = referralCode ? `nestu.app?ref=${referralCode}` : "nestu.app";
  const fullLink = `https://${link}`;

  const copy = async () => {
    try { await navigator.clipboard.writeText(fullLink); }
    catch { const el = document.createElement("textarea"); el.value = fullLink; document.body.appendChild(el); el.select(); document.execCommand("copy"); document.body.removeChild(el); }
    setCopied(true); setTimeout(() => setCopied(false), 1600);
  };

  const waText = encodeURIComponent(`Just joined the NestU waitlist — verified student housing, no scams: ${fullLink}`);

  return (
    <div className="rounded-[22px] border border-[#E8E3D7] bg-white p-8 shadow-[0_1px_0_rgba(14,15,12,.05),0_18px_40px_-16px_rgba(14,15,12,.14)] text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#5C7A5A]/15 text-[#5C7A5A]">
        <CheckIcon className="h-6 w-6" />
      </div>
      <h3 className="font-serif text-[30px] text-[#0E0F0C]">You're on the list!</h3>
      {position != null && <p className="mt-1 font-serif text-[22px] text-[#C4622D]">You're #{position} in line.</p>}
      <p className="mt-2 text-sm text-[#6B6C66] max-w-[36ch] mx-auto">Share your link below to move up the list when we launch.</p>

      {referralCode && (
        <>
          <div className="mt-5 rounded-xl border border-dashed border-[#D9D3C3] bg-[#FAFAF7] p-4">
            <div className="text-[11px] uppercase tracking-[0.14em] text-[#95968F]">Your referral code</div>
            <div className="mt-1 font-mono text-[22px] font-semibold tracking-[0.14em] text-[#C4622D]">{referralCode}</div>
          </div>
          <div className="mt-3.5 flex items-center gap-2 rounded-full border border-[#E8E3D7] bg-[#FAFAF7] p-1.5 pl-4">
            <span className="flex-1 truncate text-left font-mono text-[13px] text-[#2A2B27]">{link}</span>
            <button onClick={copy} className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#0E0F0C] px-4 py-2 text-xs font-medium text-[#FAFAF7] transition hover:opacity-80 active:scale-95">
              {copied ? <CheckIcon className="h-3.5 w-3.5" /> : <CopyIcon className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            <a href={`https://wa.me/?text=${waText}`} target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-[10px] bg-[#25D366] px-4 py-3 text-sm font-medium text-white transition hover:opacity-90 active:scale-[0.98]">
              WhatsApp
            </a>
            <button onClick={copy} className="flex items-center justify-center gap-2 rounded-[10px] border border-[#E8E3D7] bg-[#FAFAF7] px-4 py-3 text-sm font-medium text-[#0E0F0C] transition hover:bg-[#F1EEE6] active:scale-[0.98]">
              <ShareIcon className="h-4 w-4" /> Share link
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ── OAuth Error ── */
function OAuthError({ onBack }: { onBack: () => void }) {
  return (
    <div className="rounded-[22px] border border-[#E8E3D7] bg-white p-8 shadow-[0_1px_0_rgba(14,15,12,.05),0_18px_40px_-16px_rgba(14,15,12,.14)] text-center space-y-4">
      <p className="font-serif text-[24px] text-[#0E0F0C]">Couldn't reach our server</p>
      <p className="text-sm text-[#6B6C66]">Google sign-in worked but we couldn't save your spot. Please try the email form.</p>
      <button onClick={onBack} className="inline-flex items-center gap-2 rounded-[10px] bg-[#C4622D] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90">
        Use email instead
      </button>
    </div>
  );
}

/* ── Hero ── */
function Hero({ pageState, googleEmail, googleName, successData, onSuccess, onBack }: {
  pageState: PageState; googleEmail: string; googleName: string;
  successData: BackendResult | null;
  onSuccess: (r: BackendResult) => void; onBack: () => void;
}) {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!bgRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 18;
      bgRef.current.style.setProperty("--px", `${x}px`);
      bgRef.current.style.setProperty("--py", `${y}px`);
      const a = bgRef.current.querySelector(".hero-glow-a") as HTMLElement;
      const b = bgRef.current.querySelector(".hero-glow-b") as HTMLElement;
      const c = bgRef.current.querySelector(".hero-glow-c") as HTMLElement;
      if (a) a.style.transform = `translate3d(${x * 1.4}px,${y * 1.4}px,0)`;
      if (b) b.style.transform = `translate3d(${-x * 1.2}px,${-y * 1.2}px,0)`;
      if (c) c.style.transform = `translate3d(${x * 0.6}px,${-y * 0.8}px,0)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="relative overflow-hidden px-0 py-16 lg:py-24" id="top">
      <div className="pointer-events-none absolute inset-0" ref={bgRef}>
        <div className="hero-grid" />
        <div className="hero-glow-a" />
        <div className="hero-glow-b" />
        <div className="hero-glow-c" />
      </div>
      <div className="relative mx-auto max-w-[1180px] px-7">
        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_1fr]">
          {/* Left copy */}
          <div data-reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E8E3D7] bg-white px-3 py-1.5 text-[13px] text-[#2A2B27] shadow-[0_1px_0_rgba(14,15,12,.04),0_8px_24px_-10px_rgba(14,15,12,.08)]">
              <span className="dot-pulse" /> Launching Fall 2026 · 12 universities
            </span>
            <h1 data-reveal data-delay="1" className="mt-6 font-serif text-[clamp(44px,7.4vw,88px)] leading-[1.0] tracking-[-0.025em] text-[#0E0F0C] max-w-[16ch]">
              Housing shouldn't be a{" "}
              <em className="italic text-[#C4622D]">fairy tale.</em>
              <br />
              <span className="italic text-[#0E0F0C]/55">Get verified listings instead.</span>
            </h1>
            <p data-reveal data-delay="2" className="mt-5 max-w-[56ch] text-[18px] leading-[1.55] text-[#6B6C66]">
              Stop playing roommate roulette. Stop sending deposits to strangers.
              Verified subleases, AI roommate matching, and real neighborhood
              data — built for students, interns, and international newcomers.
            </p>
            <div data-reveal data-delay="2" className="mt-8 flex flex-wrap gap-3">
              <a href="#top" onClick={e => { e.preventDefault(); document.getElementById("top")?.scrollIntoView({ behavior: "smooth" }); }}
                className="flex items-center gap-2 rounded-[12px] bg-[#C4622D] px-5 py-3.5 text-[15px] font-medium text-white transition hover:-translate-y-px hover:shadow-[0_8px_22px_-8px_rgba(196,98,45,0.7)] active:scale-[0.98]">
                Get early access <ArrowIcon className="h-4 w-4" />
              </a>
              <a href="#how" className="flex items-center gap-2 rounded-[12px] border border-[#E8E3D7] bg-transparent px-5 py-3.5 text-[15px] font-medium text-[#0E0F0C] transition hover:bg-[#F1EEE6] hover:border-[#D9D3C3] active:scale-[0.98]">
                See how it works
              </a>
            </div>
            <div data-reveal data-delay="3" className="mt-5 flex flex-wrap gap-4 text-[13px] text-[#6B6C66]">
              {["Free forever", "No broker fees", "Verified listings only"].map(t => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckIcon className="h-3.5 w-3.5 text-[#5C7A5A]" /> {t}
                </span>
              ))}
            </div>
          </div>
          {/* Right: form card */}
          <div data-reveal data-delay="2">
            {pageState === "form" && <WaitlistForm onSuccess={onSuccess} />}
            {pageState === "google-details" && <GoogleDetailsForm email={googleEmail} name={googleName} onSuccess={onSuccess} />}
            {pageState === "success" && <SuccessState referralCode={successData?.referralCode} position={successData?.position ?? undefined} />}
            {pageState === "oauth-error" && <OAuthError onBack={onBack} />}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Community Strip ── */
function Community() {
  return (
    <section className="border-y border-[#E8E3D7] bg-[#F1EEE6]">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-center gap-6 px-7 py-5 text-[#6B6C66]">
        <span className="text-[11px] uppercase tracking-[0.14em] text-[#95968F]">Building together</span>
        <span className="font-serif text-[18px] italic text-[#2A2B27]/70">We're not just launching a product</span>
        <span className="h-1.5 w-1.5 rounded-full bg-[#C4622D]" />
        <span className="font-serif text-[18px] text-[#2A2B27]/70">we're building a community</span>
        <span className="h-1.5 w-1.5 rounded-full bg-[#C4622D]" />
        <span className="font-serif text-[18px] italic text-[#2A2B27]/70">students, interns, internationals & landlords</span>
      </div>
    </section>
  );
}

/* ── Featured Testimonial ── */
function FeaturedTestimonial() {
  return (
    <section className="border-y border-[#E8E3D7] bg-[#F1EEE6] py-16">
      <div className="mx-auto max-w-[1180px] px-7">
        <div data-reveal className="mx-auto max-w-[880px] rounded-[22px] border border-[#E8E3D7] bg-white p-10 shadow-[0_1px_0_rgba(14,15,12,.04),0_8px_24px_-10px_rgba(14,15,12,.08)] relative overflow-hidden md:p-14">
          <p className="font-serif text-[clamp(24px,3.4vw,36px)] leading-[1.25] tracking-[-0.012em] text-[#0E0F0C]">
            <span className="font-serif text-[90px] leading-[0] text-[#C4622D] mr-2" style={{ verticalAlign: "-28px" }}>"</span>
            NestU is what happens when someone finally listens to students. Verified listings,
            real roommate compatibility, no broker fees — it's the housing search we all
            should've had years ago.
          </p>
          <div className="mt-8 flex items-center gap-3.5 border-t border-[#E8E3D7] pt-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0E0F0C] text-[13px] font-semibold text-[#FAFAF7]">SR</span>
            <div>
              <div className="text-sm font-semibold text-[#0E0F0C]">Samira R.</div>
              <div className="text-[13px] text-[#6B6C66]">CS Junior · Early community member</div>
            </div>
            <span className="ml-auto hidden font-serif text-[18px] text-[#2A2B27]/70 sm:block">— Joined #0042</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Sublease Pitch ── */
function SubleasePitch() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-[1180px] px-7">
        <div data-reveal className="sublease-card relative grid gap-9 overflow-hidden rounded-[22px] border border-[#E8E3D7] bg-white p-10 shadow-[0_1px_0_rgba(14,15,12,.04),0_8px_24px_-10px_rgba(14,15,12,.08)] lg:grid-cols-[1.05fr_.95fr] lg:gap-14 lg:p-14 items-center">
          <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full" style={{ background: "radial-gradient(circle, rgba(196,98,45,.18), transparent 65%)", pointerEvents: "none" }} />
          <div className="relative z-10">
            <span className="text-[12px] uppercase tracking-[0.16em] text-[#C4622D] font-medium">Posting your sublease?</span>
            <h2 className="mt-3 font-serif text-[clamp(30px,4.6vw,52px)] leading-[1.05] tracking-[-0.02em] text-[#0E0F0C] max-w-[18ch]">
              The hassle of finding someone to take your room?{" "}
              <em className="italic text-[#C4622D]">We got you.</em>
            </h2>
            <p className="mt-4 text-[16px] leading-[1.6] text-[#6B6C66] max-w-[56ch]">
              Studying abroad, graduating early, or just leaving for the summer?
              List your place in 60 seconds and get matched to verified students looking right now —
              no Facebook groups, no flaky DMs, no broker fees. Free to post, always.
            </p>
            <ul className="mt-5 grid gap-2.5">
              {["Post in under a minute", "We screen every applicant", "Free — no listing fees, ever"].map(t => (
                <li key={t} className="flex items-center gap-2.5 text-sm text-[#0E0F0C]">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5C7A5A]/15 text-[#5C7A5A]">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="sublease-mock relative z-10 flex flex-col gap-3.5 rounded-[18px] border border-[#E8E3D7] bg-[#FAFAF7] p-5 shadow-[0_1px_0_rgba(14,15,12,.05),0_18px_40px_-16px_rgba(14,15,12,.14)]">
            <div className="flex items-center gap-2.5 border-b border-[#E8E3D7] pb-2">
              <span className="flex gap-1"><i className="block h-2 w-2 rounded-full bg-[#D9D3C3]" /><i className="block h-2 w-2 rounded-full bg-[#D9D3C3]" /><i className="block h-2 w-2 rounded-full bg-[#D9D3C3]" /></span>
              <span className="font-serif text-[16px]">List your sublease</span>
            </div>
            {[["Address", "123 Telegraph Ave, Berkeley"], ["Monthly rent", "$890 / mo"]].map(([label, val]) => (
              <div key={label} className="flex flex-col gap-1">
                <label className="text-[11px] uppercase tracking-[0.1em] text-[#6B6C66]">{label}</label>
                <div className="rounded-[10px] border border-[#E8E3D7] bg-white px-3 py-2.5 text-[13px] font-medium text-[#0E0F0C]">{val}</div>
              </div>
            ))}
            <div className="grid grid-cols-2 gap-2.5">
              {[["From", "Aug 15"], ["To", "Dec 20"]].map(([label, val]) => (
                <div key={label} className="flex flex-col gap-1">
                  <label className="text-[11px] uppercase tracking-[0.1em] text-[#6B6C66]">{label}</label>
                  <div className="rounded-[10px] border border-[#E8E3D7] bg-white px-3 py-2.5 text-[13px] font-medium text-[#0E0F0C]">{val}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between rounded-[10px] bg-[#C4622D] px-3.5 py-3 text-[13px] font-medium text-white shadow-[0_8px_22px_-8px_rgba(196,98,45,0.7)]">
              <span>Post listing</span><ArrowIcon className="h-3.5 w-3.5" />
            </div>
            <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-[#5C7A5A]/30 bg-[#5C7A5A]/10 px-2.5 py-1 text-[11px] font-semibold text-[#5C7A5A]">
              <CheckIcon className="h-3 w-3" /> 3 verified students viewing
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CountUp ── */
function CountUp({ to, suffix = "", duration = 1400 }: { to: number; suffix?: string; duration?: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      });
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ── Stats ── */
function Stats() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-[1180px] px-7">
        <div className="section-head">
          <span data-reveal className="text-[12px] uppercase tracking-[0.16em] text-[#C4622D] font-medium">The problem</span>
          <h2 data-reveal data-delay="1" className="mt-3 font-serif text-[clamp(32px,5vw,56px)] leading-[1.05] tracking-[-0.02em] text-[#0E0F0C] max-w-[22ch]">
            Finding housing near campus is broken.
          </h2>
        </div>
        <div data-reveal data-delay="2" className="mt-10 grid gap-11 rounded-[22px] border border-[#E8E3D7] bg-white p-11 md:grid-cols-3">
          <div>
            <div className="font-serif text-[clamp(48px,6vw,72px)] leading-[0.95] text-[#C4622D] italic"><CountUp to={72} suffix="%" /></div>
            <p className="mt-2.5 text-sm leading-[1.55] text-[#6B6C66] max-w-[28ch]">of students say finding housing near campus is stressful.</p>
          </div>
          <div>
            <div className="font-serif text-[clamp(48px,6vw,72px)] leading-[0.95] text-[#0E0F0C]">1<span className="text-[#C4622D]">:</span>3</div>
            <p className="mt-2.5 text-sm leading-[1.55] text-[#6B6C66] max-w-[28ch]">students have been scammed or nearly scammed on Craigslist.</p>
          </div>
          <div>
            <div className="font-serif text-[clamp(48px,6vw,72px)] leading-[0.95] text-[#0E0F0C]">$<CountUp to={400} /><span className="text-[#C4622D]">+</span></div>
            <p className="mt-2.5 text-sm leading-[1.55] text-[#6B6C66] max-w-[28ch]">average broker fee just to view an apartment.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── How It Works ── */
function HowItWorks() {
  const steps = [
    { n: "01", t: "Create your profile", d: "Tell us your budget, move-in date, university, and lifestyle preferences. Takes about 3 minutes." },
    { n: "02", t: "Browse verified listings", d: "Filter by price, distance to campus, furnishing, pets. Every listing is landlord-verified before going live." },
    { n: "03", t: "Match and move in", d: "AI matches you with compatible roommates. Chat, connect, and sign. All in one place." },
  ];
  return (
    <section id="how" className="border-y border-[#E8E3D7] bg-[#F1EEE6] py-24">
      <div className="mx-auto max-w-[1180px] px-7">
        <span data-reveal className="text-[12px] uppercase tracking-[0.16em] text-[#C4622D] font-medium">How it works</span>
        <h2 data-reveal data-delay="1" className="mt-3 font-serif text-[clamp(32px,5vw,56px)] leading-[1.05] tracking-[-0.02em] text-[#0E0F0C] max-w-[22ch]">
          Three steps. No spreadsheets, no scams.
        </h2>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.n} data-reveal data-delay={String(i + 1)} className="card-hover rounded-[22px] border border-[#E8E3D7] bg-white p-7">
              <div className="font-serif text-[22px] tracking-[0.02em] text-[#C4622D]">{s.n}</div>
              <h3 className="mt-3.5 font-serif text-[26px] leading-[1.1] tracking-[-0.012em] text-[#0E0F0C]">{s.t}</h3>
              <p className="mt-2.5 text-[15px] leading-[1.55] text-[#6B6C66]">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Features ── */
function Features() {
  const features = [
    { icon: KeyIcon, title: "Real listings. Zero scams.", body: "Every landlord goes through identity verification. Every listing is reviewed before it goes live. No Craigslist risk, no fake posts, no lockbox tricks.", tags: ["Identity verified", "Short-term ok", "Furnished options", "Semester leases"], span: true },
    { icon: SparkIcon, title: "Roommate matching that works.", body: "Answer 8 questions. Our AI scores compatibility on sleep, cleanliness, budget, and lifestyle.", tags: ["Sleep", "Cleanliness", "Budget"], span: false },
    { icon: PinIcon, title: "Know the block before you sign.", body: "Walkability to campus, food, transit, gyms, grocery. Decide with full context, not just rent.", tags: ["Walkability", "Food nearby", "Transit"], span: false },
    { icon: UsersIcon, title: "Move in with people you click with.", body: "Group chat with matches, share listings, coordinate move-in dates — all in one place before lease day.", tags: ["Group chats", "Saved listings", "Move-in planning"], span: true },
  ];
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-[1180px] px-7">
        <span data-reveal className="text-[12px] uppercase tracking-[0.16em] text-[#5C7A5A] font-medium">Features</span>
        <h2 data-reveal data-delay="1" className="mt-3 font-serif text-[clamp(32px,5vw,56px)] leading-[1.05] tracking-[-0.02em] text-[#0E0F0C] max-w-[22ch]">
          Everything campus housing should've been.
        </h2>
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} data-reveal className={`card-hover rounded-[22px] border border-[#E8E3D7] bg-white p-9 ${f.span ? "md:col-span-2" : ""}`}>
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#F1EEE6] text-[#0E0F0C]">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-[30px] leading-[1.05] tracking-[-0.012em] text-[#0E0F0C]">{f.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-[#6B6C66] max-w-[50ch]">{f.body}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {f.tags.map(t => <span key={t} className="rounded-full border border-[#E8E3D7] bg-[#F1EEE6] px-2.5 py-1 text-[12px] text-[#2A2B27]">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Marquee ── */
function Marquee() {
  const items = ["Verified students & professionals", "AI roommate matching", "Real subleases, zero scams", "Know the neighborhood", "No broker fees, ever", "Built for campus"];
  const doubled = [...items, ...items];
  return (
    <div className="marquee-dark">
      <div className="marquee-track flex gap-9 pr-9 shrink-0">
        {doubled.map((it, i) => (
          <span key={i} className="flex shrink-0 items-center gap-2.5 text-sm font-medium text-[#FAFAF7] whitespace-nowrap">
            {it}
            <span className="h-1.5 w-1.5 rounded-full bg-[#C4622D]" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Universities ── */
function Universities() {
  return (
    <section id="schools" className="border-y border-[#E8E3D7] bg-[#F1EEE6] py-24">
      <div className="mx-auto max-w-[1180px] px-7">
        <div className="mx-auto max-w-[720px] text-center">
          <span data-reveal className="text-[12px] uppercase tracking-[0.16em] text-[#5C7A5A] font-medium">Launching everywhere</span>
          <h2 data-reveal data-delay="1" className="mt-3 font-serif text-[clamp(32px,5vw,56px)] leading-[1.05] tracking-[-0.02em] text-[#0E0F0C]">
            Coming soon to a campus near you.
          </h2>
          <p data-reveal data-delay="2" className="mt-3.5 text-[17px] leading-[1.55] text-[#6B6C66]">
            Join the waitlist and tell us where you study — the most-requested campuses launch first.
          </p>
        </div>
        <div data-reveal data-delay="2" className="mt-10 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-4 rounded-[22px] border border-[#E8E3D7] bg-white px-7 py-5 shadow-[0_1px_0_rgba(14,15,12,.04),0_8px_24px_-10px_rgba(14,15,12,.08)]">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E8E3D7] bg-[#FAFAF7] px-3 py-1.5 text-[13px] text-[#2A2B27]">
              <span className="dot-pulse" /> Live
            </span>
            <span className="font-serif text-[22px] tracking-[-0.012em] text-[#0E0F0C]">Coming soon</span>
            <span className="text-sm text-[#6B6C66]">· Fall 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer({ onJoin }: { onJoin: () => void }) {
  return (
    <footer className="bg-[#0E0F0C] px-0 pt-14 pb-9 text-[#FAFAF7]">
      <div className="mx-auto max-w-[1180px] px-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Logo light />
          <button onClick={onJoin} className="flex items-center gap-2 rounded-[10px] bg-[#FAFAF7] px-4 py-2.5 text-sm font-medium text-[#0E0F0C] transition hover:-translate-y-px hover:shadow-lg active:scale-[0.98]">
            Get early access <ArrowIcon className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-[12px] text-[#FAFAF7]/60">
          <p>Coming to every university. © {new Date().getFullYear()} NestU.</p>
          <p className="mt-2 max-w-[60ch] leading-[1.55]">NestU is a housing search platform. We are not a licensed real estate broker. Joining the waitlist does not constitute a lease, reservation, or commitment of any kind.</p>
        </div>
      </div>
    </footer>
  );
}

/* ── App ── */
export default function App() {
  const [pageState, setPageState] = useState<PageState>("form");
  const [googleEmail, setGoogleEmail] = useState("");
  const [googleName, setGoogleName] = useState("");
  const [successData, setSuccessData] = useState<BackendResult | null>(null);

  const handleSuccess = (result: BackendResult) => { setSuccessData(result); setPageState("success"); };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user?.email) {
        const meta = session.user.user_metadata as { full_name?: string; name?: string } | undefined;
        await supabase.auth.signOut();
        setGoogleEmail(session.user.email.toLowerCase());
        setGoogleName(meta?.full_name ?? meta?.name ?? "");
        setPageState("google-details");
        setTimeout(() => document.getElementById("top")?.scrollIntoView({ behavior: "smooth" }), 80);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // Scroll-reveal observer
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    const seen = new WeakSet<Element>();
    const sweep = () => {
      document.querySelectorAll("[data-reveal]").forEach(el => {
        if (!seen.has(el)) { obs.observe(el); seen.add(el); }
      });
    };
    sweep();
    const id = setInterval(sweep, 600);
    return () => { clearInterval(id); obs.disconnect(); };
  }, []);

  const scrollToTop = () => document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });

  const heroProps = {
    pageState,
    googleEmail,
    googleName,
    successData,
    onSuccess: handleSuccess,
    onBack: () => setPageState("form"),
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <Nav onJoin={scrollToTop} />
      <Hero {...heroProps} />
      <Community />
      <FeaturedTestimonial />
      <SubleasePitch />
      <Stats />
      <HowItWorks />
      <Features />
      <Marquee />
      <Universities />
      <Footer onJoin={scrollToTop} />
    </div>
  );
}
