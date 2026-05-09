import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Home, Check, Copy, ArrowRight, ShieldCheck, Users, MapPin } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "NestU — Student housing near campus, without the hassle" },
      {
        name: "description",
        content:
          "Join the NestU waitlist. Verified sublease & housing listings, AI roommate matching, and nearby essentials — starting at ASU Tempe, expanding to all universities.",
      },
      { property: "og:title", content: "NestU — Your next home near campus" },
      {
        property: "og:description",
        content:
          "Verified listings, AI roommate matching, no broker fees. Starting at ASU Tempe, Fall 2026.",
      },
    ],
  }),
});

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--ink)]">
        <Home className="h-4 w-4 text-[var(--background)]" strokeWidth={2.2} />
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[var(--orange-accent)] ring-2 ring-[var(--background)]" />
      </div>
      <span className="font-serif text-2xl tracking-tight text-[var(--ink)]">NestU</span>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-card px-3.5 py-1.5 text-sm text-[var(--ink)] shadow-soft">
      {children}
    </span>
  );
}

function WaitlistForm({ onSubmit }: { onSubmit: () => void }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [university, setUniversity] = useState("");
  const [referral, setReferral] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setTimeout(() => onSubmit(), 600);
  };

  return (
    <form
      onSubmit={handle}
      className="mx-auto w-full max-w-[520px] rounded-2xl border border-[var(--border)] bg-card p-6 shadow-soft sm:p-8"
    >
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[var(--ink)]">
            Email address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@asu.edu"
            className="w-full rounded-xl border border-[var(--border)] bg-card px-4 py-3.5 text-base text-[var(--ink)] outline-none transition focus:border-[var(--orange-accent)] focus:ring-2 focus:ring-[var(--orange-accent)]/20"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
              I am a… <span className="text-muted-foreground/70">(optional)</span>
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-card px-4 py-3 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--orange-accent)] focus:ring-2 focus:ring-[var(--orange-accent)]/20"
            >
              <option value="">Select…</option>
              <option>Student</option>
              <option>Intern</option>
              <option>Young professional</option>
              <option>International student</option>
              <option>Landlord</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
              University <span className="text-muted-foreground/70">(optional)</span>
            </label>
            <input
              type="text"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              placeholder="e.g. ASU Tempe"
              className="w-full rounded-xl border border-[var(--border)] bg-card px-4 py-3 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--orange-accent)] focus:ring-2 focus:ring-[var(--orange-accent)]/20"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
            Referral code <span className="text-muted-foreground/70">(optional)</span>
          </label>
          <input
            type="text"
            value={referral}
            onChange={(e) => setReferral(e.target.value)}
            placeholder="NESTU-XXXX"
            className="w-full rounded-xl border border-[var(--border)] bg-card px-4 py-3 font-mono text-sm tracking-wider text-[var(--ink)] outline-none transition focus:border-[var(--orange-accent)] focus:ring-2 focus:ring-[var(--orange-accent)]/20"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--ink)] px-6 py-4 text-base font-medium text-[var(--background)] transition hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Joining…" : "Get Early Access"}
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </button>

        <p className="text-center text-xs text-muted-foreground">
          Free to join. No spam. Unsubscribe anytime.
        </p>
      </div>
    </form>
  );
}

function SuccessState() {
  const [copied, setCopied] = useState(false);
  const referralLink = "nestu.app/r/u-12";

  const copy = () => {
    navigator.clipboard?.writeText(`https://${referralLink}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const shareText = encodeURIComponent(
    "I just joined the NestU waitlist — student housing without the hassle. Join me:",
  );
  const waUrl = `https://wa.me/?text=${shareText}%20https://${referralLink}`;

  return (
    <div className="mx-auto w-full max-w-[520px] rounded-2xl border border-[var(--border)] bg-card p-8 text-center shadow-soft animate-fade-up">
      <div className="mx-auto mb-4 text-4xl">🎉</div>
      <h3 className="font-serif text-3xl text-[var(--ink)]">You're #12 on the waitlist!</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Share your link to move up the list.
      </p>

      <div className="mt-6 flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background)] p-1.5 pl-4">
        <span className="flex-1 truncate text-left font-mono text-sm text-[var(--ink)]">
          {referralLink}
        </span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 rounded-full bg-[var(--ink)] px-4 py-2 text-xs font-medium text-[var(--background)] transition hover:opacity-90"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          WhatsApp
        </a>
        <button
          onClick={copy}
          className="flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-card px-4 py-3 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--background)]"
        >
          Instagram
        </button>
      </div>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: typeof ShieldCheck;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-card p-7 shadow-soft transition hover:-translate-y-0.5">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--background)] text-[var(--ink)]">
        <Icon className="h-5 w-5" strokeWidth={1.8} />
      </div>
      <h3 className="font-serif text-2xl text-[var(--ink)]">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  );
}

function AudienceCard({
  emoji,
  title,
  bullets,
}: {
  emoji: string;
  title: string;
  bullets: [string, string];
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-card p-7 shadow-soft">
      <div className="mb-3 text-3xl">{emoji}</div>
      <h3 className="font-serif text-2xl text-[var(--ink)]">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-[15px] text-[var(--ink)]/85">
            <Check
              className="mt-0.5 h-4 w-4 shrink-0 text-[var(--sage)]"
              strokeWidth={2.5}
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Index() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 pt-8">
        <Logo />
      </header>

      {/* Hero */}
      <section className="hero-radial">
        <div className="mx-auto max-w-3xl px-6 pb-16 pt-12 text-center sm:pt-20">
          <div className="animate-fade-up">
            <Chip>
              <span className="text-[var(--orange-accent)]">🚀</span>
              <span>Starting at ASU Tempe · Coming to all universities</span>
            </Chip>
          </div>

          <h1 className="mt-7 font-serif text-5xl leading-[1.05] text-[var(--ink)] animate-fade-up-delay-1 sm:text-6xl md:text-[68px]">
            Your next home near campus.
            <br />
            <span className="italic text-[var(--ink)]/70">No hassle, no scams.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground animate-fade-up-delay-2">
            Verified sublease listings, AI roommate matching, and nearby essentials —
            built for students, interns, and young professionals.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2 animate-fade-up-delay-2">
            <Chip>🎓 Students</Chip>
            <Chip>💼 Interns</Chip>
            <Chip>🌐 Young professionals</Chip>
          </div>

          <div className="mt-12 animate-fade-up-delay-3">
            {submitted ? <SuccessState /> : <WaitlistForm onSubmit={() => setSubmitted(true)} />}
          </div>
        </div>
      </section>

      {/* Why NestU */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-sm uppercase tracking-[0.18em] text-[var(--orange-accent)]">
            Why NestU
          </div>
          <h2 className="mt-3 font-serif text-4xl text-[var(--ink)] sm:text-5xl">
            Housing, finally built for the way students actually live.
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          <FeatureCard
            icon={ShieldCheck}
            title="Verified listings"
            desc="Identity-checked landlords and reviewed listings. Zero Craigslist risk, zero broker fees."
          />
          <FeatureCard
            icon={Users}
            title="AI roommate matching"
            desc="Match on sleep schedule, budget, cleanliness, and lifestyle — not just who replied first."
          />
          <FeatureCard
            icon={MapPin}
            title="Sublease marketplace"
            desc="Short-term, furnished, and semester-long options near campus. See nearby food, transit, and essentials."
          />
        </div>
      </section>

      {/* Who it's for */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-sm uppercase tracking-[0.18em] text-[var(--sage)]">
            Who it's for
          </div>
          <h2 className="mt-3 font-serif text-4xl text-[var(--ink)] sm:text-5xl">
            Whether you're moving in for a semester or a summer.
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          <AudienceCard
            emoji="🎓"
            title="Students"
            bullets={[
              "Find verified housing within walking distance of class",
              "Match with roommates who fit your schedule and habits",
            ]}
          />
          <AudienceCard
            emoji="💼"
            title="Interns"
            bullets={[
              "Short-term, furnished sublets that fit your start date",
              "No long leases, no surprise deposits",
            ]}
          />
          <AudienceCard
            emoji="🌐"
            title="Young professionals"
            bullets={[
              "Move-in ready places near campus neighborhoods",
              "Discover nearby food, transit, and essentials at a glance",
            ]}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-6 py-10 text-center">
          <div className="mb-4 flex justify-center">
            <Logo />
          </div>
          <p className="text-sm text-[var(--ink)]/70">
            Starting at ASU Tempe · No spam · Unsubscribe anytime
          </p>
          <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-muted-foreground">
            NestU is launching Fall 2026. Listings, availability, and features described
            here are forthcoming. Joining the waitlist does not constitute a lease,
            reservation, or commitment of any kind. © {new Date().getFullYear()} NestU.
          </p>
        </div>
      </footer>
    </div>
  );
}
