import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import {
  Home,
  Check,
  Copy,
  ArrowRight,
  Key,
  Users,
  MapPin,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  Sparkle,
  Building2,
  Plane,
  GraduationCap,
  Briefcase,
  Ghost,
  Flame,
  DollarSign,
  Globe2,
  AlertTriangle,
  Lock,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        title:
          "NestU — Verified student housing, scam-free roommate matching, no broker fees",
      },
      {
        name: "description",
        content:
          "Stop playing roommate roulette and get burned by Craigslist scams. Verified subleases, AI roommate matching by lifestyle, and neighborhood insights for students, interns, international students, and young professionals. Free to join.",
      },
      {
        name: "keywords",
        content:
          "student housing, verified sublease, college apartments, roommate matching, international student housing, intern housing, no broker fees, off campus housing, scam free rentals, ASU housing, university housing waitlist",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "NestU" },
      {
        property: "og:title",
        content: "NestU — Stop the housing fairy tale. Get verified listings instead.",
      },
      {
        property: "og:description",
        content:
          "Verified landlords. AI roommate matching. Real neighborhood data. Built for students, interns, and young professionals near campus.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "NestU — Verified student housing, no scams, no broker fees",
      },
      {
        name: "twitter:description",
        content:
          "Stop Craigslist roulette. Verified subleases, lifestyle-based roommate matching, and real neighborhood insights.",
      },
    ],
    links: [{ rel: "canonical", href: "https://nestu.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: "NestU",
              url: "https://nestu.app/",
              description:
                "Verified student housing, AI roommate matching, and neighborhood insights for students, interns, international students, and young professionals.",
              sameAs: [],
            },
            {
              "@type": "WebSite",
              name: "NestU",
              url: "https://nestu.app/",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://nestu.app/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Is NestU free to use?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. NestU is free for students, interns, international students, and young professionals. No broker fees, no charges to browse, match, or message.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How does NestU prevent rental scams?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Every landlord submits ID and proof of ownership or management rights for the unit. Listings are reviewed before going live. Suspicious posts are removed.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can international students sign up before arriving in the US?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. NestU is built so you can browse verified listings and match with roommates from abroad, before you board the plane.",
                  },
                },
              ],
            },
          ],
        }),
      },
    ],
  }),
});

/* ---------------- Logo ---------------- */
function Logo({ tone = "ink" }: { tone?: "ink" | "light" }) {
  const isLight = tone === "light";
  return (
    <div className="flex items-center gap-2">
      <div
        className={`relative flex h-8 w-8 items-center justify-center rounded-lg ${
          isLight ? "bg-[var(--background)]" : "bg-[var(--ink)]"
        }`}
      >
        <Home
          className={`h-4 w-4 ${isLight ? "text-[var(--ink)]" : "text-[var(--background)]"}`}
          strokeWidth={2.2}
        />
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[var(--orange-accent)] ring-2 ring-[var(--background)]" />
      </div>
      <span
        className={`font-serif text-2xl tracking-tight ${
          isLight ? "text-[var(--background)]" : "text-[var(--ink)]"
        }`}
      >
        NestU
      </span>
    </div>
  );
}

/* ---------------- Buttons ---------------- */
function PrimaryButton({
  children,
  className = "",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={`group inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--orange-accent)] px-6 py-3.5 text-base font-medium text-white shadow-soft transition hover:opacity-95 disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  );
}
function GhostButton({
  children,
  className = "",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-card px-6 py-3.5 text-base font-medium text-[var(--ink)] transition hover:bg-[var(--background)] ${className}`}
    >
      {children}
    </button>
  );
}

function Chip({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-card px-3.5 py-1.5 text-sm text-[var(--ink)] shadow-soft ${className}`}
    >
      {children}
    </span>
  );
}

/* ---------------- Nav ---------------- */
function Nav({ onJoin }: { onJoin: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)]/60 bg-[var(--background)]/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo />
        <button
          onClick={onJoin}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--orange-accent)] px-4 py-2.5 text-sm font-medium text-white shadow-soft transition hover:opacity-95"
        >
          Join Waitlist
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */
function ListingMock() {
  return (
    <div className="relative w-full max-w-sm pb-10 sm:pb-16 sm:pl-6">
      <div className="rounded-2xl border border-[var(--border)] bg-card p-3 shadow-soft lift">
        <div className="relative h-48 overflow-hidden rounded-xl bg-gradient-to-br from-[oklch(0.85_0.04_60)] to-[oklch(0.72_0.06_45)]">
          <div className="absolute inset-0 grain opacity-40" />
          <div className="absolute left-3 top-3">
            <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-medium text-[var(--ink)] shadow-soft">
              ✓ Verified
            </span>
          </div>
          <div className="absolute right-3 top-3">
            <span className="rounded-full bg-[var(--sage)] px-2.5 py-1 text-[11px] font-medium text-white shadow-soft">
              94% match
            </span>
          </div>
        </div>
        <div className="px-2 pb-2 pt-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="font-serif text-lg leading-tight text-[var(--ink)]">
                Sunlit 2BR near campus
              </h4>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" /> 6 min walk to campus
              </p>
            </div>
            <div className="text-right">
              <div className="font-serif text-xl text-[var(--ink)]">$890</div>
              <div className="text-[11px] text-muted-foreground">/mo</div>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-[var(--background)] px-2 py-0.5 text-[11px] text-[var(--ink)]/80">
              Furnished
            </span>
            <span className="rounded-full bg-[var(--background)] px-2 py-0.5 text-[11px] text-[var(--ink)]/80">
              Sublease
            </span>
            <span className="rounded-full bg-[var(--background)] px-2 py-0.5 text-[11px] text-[var(--ink)]/80">
              Aug → Dec
            </span>
          </div>
        </div>
      </div>
      {/* floating roommate match card */}
      <div className="absolute bottom-0 left-0 hidden w-48 rotate-[-3deg] rounded-xl border border-[var(--border)] bg-card p-3 shadow-soft sm:block">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--sage)] text-xs font-medium text-white">
            PM
          </div>
          <div>
            <div className="text-xs font-medium text-[var(--ink)]">Roommate match</div>
            <div className="text-[10px] text-muted-foreground">Sleep · Budget · Habits</div>
          </div>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[var(--background)]">
          <div className="h-full w-[88%] rounded-full bg-[var(--sage)]" />
        </div>
      </div>
    </div>
  );
}

function Hero({ onJoin }: { onJoin: () => void }) {
  return (
    <section className="hero-radial relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grain opacity-50" />
      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-14 sm:pt-20 lg:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div className="animate-fade-up text-center lg:text-left">
            <Chip>
              <span>🏠</span>
              <span>Launching at universities everywhere · Fall 2026</span>
            </Chip>

            <h1 className="mt-6 font-serif text-[44px] leading-[1.02] text-[var(--ink)] sm:text-6xl lg:text-[76px]">
              Housing shouldn't be a
              <span className="italic text-[var(--orange-accent)]"> fairy tale</span>.
              <br />
              <span className="italic text-[var(--ink)]/70">
                Get verified listings instead.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground lg:mx-0">
              Stop playing roommate roulette. Stop sending deposits to strangers.
              Verified subleases, AI roommate matching by lifestyle, and real
              neighborhood data, built for students, interns, international students,
              and young professionals.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <PrimaryButton onClick={onJoin}>
                Get Early Access
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </PrimaryButton>
              <GhostButton
                onClick={() =>
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                See how it works
              </GhostButton>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-[var(--ink)]/75 lg:justify-start">
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[var(--sage)]" strokeWidth={2.5} /> Free
                forever
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[var(--sage)]" strokeWidth={2.5} /> No
                broker fees
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[var(--sage)]" strokeWidth={2.5} />{" "}
                Verified listings only
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-card px-3 py-1.5 text-xs text-[var(--ink)]/80 shadow-soft">
                <GraduationCap className="h-3.5 w-3.5" /> Students
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-card px-3 py-1.5 text-xs text-[var(--ink)]/80 shadow-soft">
                <Plane className="h-3.5 w-3.5" /> International students
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-card px-3 py-1.5 text-xs text-[var(--ink)]/80 shadow-soft">
                <Briefcase className="h-3.5 w-3.5" /> Interns &amp; young professionals
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-end animate-fade-up-delay-2">
            <ListingMock />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Problem Bar ---------------- */
function Marquee({
  items,
  variant = "light",
  fast = false,
}: {
  items: { icon?: React.ReactNode; text: string }[];
  variant?: "light" | "dark" | "accent";
  fast?: boolean;
}) {
  const styles =
    variant === "dark"
      ? "bg-[var(--ink)] text-[var(--background)] border-y border-white/10"
      : variant === "accent"
      ? "bg-[var(--orange-accent)] text-white"
      : "bg-tint text-[var(--ink)] border-y border-[var(--border)]";
  const doubled = [...items, ...items];
  return (
    <div className={`marquee py-4 ${styles}`}>
      <div className={`marquee-track ${fast ? "marquee-track-fast" : ""}`}>
        {doubled.map((it, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-2.5 text-sm font-medium tracking-tight"
          >
            {it.icon}
            <span>{it.text}</span>
            <span
              aria-hidden
              className={`ml-2.5 h-1.5 w-1.5 rounded-full ${
                variant === "accent" ? "bg-white/70" : "bg-[var(--orange-accent)]"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function TopMarquee() {
  const items = [
    { icon: <ShieldCheck className="h-4 w-4" />, text: "Verified students & young professionals" },
    { icon: <Sparkle className="h-4 w-4" />, text: "AI roommate matching" },
    { icon: <Key className="h-4 w-4" />, text: "Real subleases, zero scams" },
    { icon: <MapPin className="h-4 w-4" />, text: "Know the neighborhood before you sign" },
    { icon: <Building2 className="h-4 w-4" />, text: "No broker fees, ever" },
    { icon: <GraduationCap className="h-4 w-4" />, text: "Built for campuses everywhere" },
  ];
  return <Marquee items={items} variant="light" />;
}

function CtaMarquee() {
  const items = [
    { text: "Join the NestU waitlist" },
    { text: "Free forever" },
    { text: "Verified listings only" },
    { text: "AI roommate matching" },
    { text: "No broker fees" },
    { text: "Coming to your campus" },
  ];
  return <Marquee items={items} variant="accent" fast />;
}

function ProblemBar() {
  const stats = [
    { num: "72%", caption: "of students say finding housing near campus is stressful" },
    { num: "1 in 3", caption: "students have been scammed or nearly scammed on Craigslist" },
    { num: "$400+", caption: "average broker fee just to view an apartment" },
  ];
  return (
    <section className="bg-[var(--ink)] py-16 text-[var(--background)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3">
        {stats.map((s) => (
          <div key={s.num} className="text-center md:text-left">
            <div className="font-serif text-5xl tracking-tight sm:text-6xl">{s.num}</div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--background)]/65">
              {s.caption}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- How It Works ---------------- */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      t: "Create your profile",
      d: "Tell us your budget, move-in date, university, and lifestyle preferences. Takes about 3 minutes.",
    },
    {
      n: "02",
      t: "Browse verified listings",
      d: "Filter by room type, price, distance to campus, furnished, and pet-friendly. Every listing is landlord-verified.",
    },
    {
      n: "03",
      t: "Match and move in",
      d: "AI matches you with compatible roommates. Chat, connect, and sign, all in one place.",
    },
  ];
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-sm uppercase tracking-[0.18em] text-[var(--orange-accent)]">
          How it works
        </div>
        <h2 className="mt-3 font-serif text-4xl text-[var(--ink)] sm:text-5xl">
          Three steps. No spreadsheets, no scams.
        </h2>
      </div>

      <div className="relative mt-16 grid gap-10 md:grid-cols-3">
        <div
          aria-hidden
          className="absolute left-[16%] right-[16%] top-12 hidden border-t border-dashed border-[var(--border)] md:block"
        />
        {steps.map((s) => (
          <div key={s.n} className="relative text-center md:text-left">
            <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[var(--border)] bg-card font-serif text-2xl text-[var(--ink)] shadow-soft md:mx-0">
              {s.n}
            </div>
            <h3 className="mt-5 font-serif text-2xl text-[var(--ink)]">{s.t}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              {s.d}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Features ---------------- */
function FeatureCard({
  icon: Icon,
  eyebrow,
  title,
  body,
  tags,
  span = false,
}: {
  icon: typeof Key;
  eyebrow: string;
  title: string;
  body: string;
  tags: string[];
  span?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[var(--border)] bg-card p-8 shadow-soft sm:p-10 lift ${
        span ? "md:col-span-2" : ""
      }`}
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[var(--orange-accent)]">
        {eyebrow}
      </div>
      <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--background)] text-[var(--ink)]">
        <Icon className="h-5 w-5" strokeWidth={1.8} />
      </div>
      <h3 className="mt-5 font-serif text-3xl leading-[1.1] text-[var(--ink)] sm:text-4xl">
        {title}
      </h3>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
        {body}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1 text-xs text-[var(--ink)]/80"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Features() {
  return (
    <section className="bg-tint py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-sm uppercase tracking-[0.18em] text-[var(--sage)]">
            Features
          </div>
          <h2 className="mt-3 font-serif text-4xl text-[var(--ink)] sm:text-5xl">
            Everything campus housing should have been.
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          <FeatureCard
            icon={Key}
            eyebrow="Verified marketplace"
            title="Real listings. Zero scams."
            body="Every landlord goes through identity verification. Every listing is reviewed before it goes live. No Craigslist risk, no fake posts."
            tags={["Short-term available", "Furnished options", "Semester leases"]}
            span
          />
          <FeatureCard
            icon={Sparkles}
            eyebrow="AI matching"
            title="Your next roommate, not your next nightmare."
            body="Answer 8 questions about your habits. Our AI scores compatibility across sleep schedule, cleanliness, budget, and lifestyle."
            tags={["Sleep schedule", "Cleanliness", "Budget fit", "Lifestyle"]}
          />
          <FeatureCard
            icon={MapPin}
            eyebrow="Neighborhood intel"
            title="Know the neighborhood before you sign."
            body="Every listing shows walkability to campus, nearby food, transit, gyms, and grocery stores. Decide with full context, not just rent price."
            tags={["Distance to campus", "Food nearby", "Transit access"]}
          />
          <FeatureCard
            icon={Users}
            eyebrow="Community"
            title="Move in with people you actually click with."
            body="Group chat with roommate matches, share listings, and coordinate move-in dates, all in one place before lease day."
            tags={["Group chats", "Saved listings", "Move-in planning"]}
            span
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Who It's For ---------------- */
function AudienceCard({
  emoji,
  title,
  body,
}: {
  emoji: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-card p-7 shadow-soft lift">
      <div className="mb-3 text-3xl">{emoji}</div>
      <h3 className="font-serif text-2xl text-[var(--ink)]">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function WhoItsFor() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-sm uppercase tracking-[0.18em] text-[var(--orange-accent)]">
          Who it's for
        </div>
        <h2 className="mt-3 font-serif text-4xl text-[var(--ink)] sm:text-5xl">
          Built for everyone near campus.
        </h2>
      </div>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <AudienceCard
          emoji="🎓"
          title="Students"
          body="Find verified housing before you arrive. On-campus alternatives that don't require already knowing someone."
        />
        <AudienceCard
          emoji="✈️"
          title="International students"
          body="Arriving from abroad? Browse and reserve before you land. No local network needed."
        />
        <AudienceCard
          emoji="💼"
          title="Interns & young professionals"
          body="Short-term furnished subleases near your office or campus. Month-to-month options, no 12-month commitment."
        />
        <AudienceCard
          emoji="🏠"
          title="Landlords & property owners"
          body="List your unit to verified students and young professionals. Free to list. No middleman, no broker fees."
        />
      </div>
    </section>
  );
}

/* ---------------- Universities ---------------- */
function Universities() {
  const schools = [
    "UC Berkeley",
    "UT Austin",
    "University of Michigan",
    "NYU",
    "Georgia Tech",
    "UCLA",
    "University of Illinois",
    "Penn State",
    "USC",
    "University of Washington",
  ];
  return (
    <section className="bg-tint py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-sm uppercase tracking-[0.18em] text-[var(--sage)]">
            Launching everywhere
          </div>
          <h2 className="mt-3 font-serif text-4xl text-[var(--ink)] sm:text-5xl">
            Coming to a campus near you.
          </h2>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
          {schools.map((s) => (
            <span
              key={s}
              className="rounded-full border border-[var(--border)] bg-card px-4 py-2 text-sm text-[var(--ink)]/85 shadow-soft"
            >
              {s}
            </span>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-xl text-center text-sm text-muted-foreground">
          Request NestU at your university. The most requested schools launch next.
        </p>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
function Testimonials() {
  const quotes = [
    {
      q: "I spent 3 weeks on Craigslist and got ghosted 11 times. NestU had me in a place within a week.",
      n: "Priya M.",
      m: "CS Junior",
      i: "PM",
    },
    {
      q: "The roommate matching actually works. I answered 8 questions and my match was almost identical to me in habits.",
      n: "Marcus T.",
      m: "Business Senior",
      i: "MT",
    },
    {
      q: "As an international student I had no idea how to find housing before arriving. NestU made it possible.",
      n: "Wei L.",
      m: "Graduate Student",
      i: "WL",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-sm uppercase tracking-[0.18em] text-[var(--orange-accent)]">
          Beta feedback
        </div>
        <h2 className="mt-3 font-serif text-4xl text-[var(--ink)] sm:text-5xl">
          What students are saying.
        </h2>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {quotes.map((t) => (
          <figure
            key={t.n}
            className="flex flex-col rounded-2xl border border-[var(--border)] bg-card p-7 shadow-soft lift"
          >
            <blockquote className="font-serif text-xl leading-snug text-[var(--ink)]">
              "{t.q}"
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-[var(--border)] pt-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--ink)] text-xs font-medium text-[var(--background)]">
                {t.i}
              </span>
              <span>
                <div className="text-sm font-medium text-[var(--ink)]">{t.n}</div>
                <div className="text-xs text-muted-foreground">{t.m}</div>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Waitlist ---------------- */
function WaitlistForm({ onSubmit }: { onSubmit: () => void }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [university, setUniversity] = useState("");
  const [referral, setReferral] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !trimmed.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    const { error: dbError } = await supabase.from("waitlist_signups").insert({
      email: trimmed,
      role: role || null,
      university: university.trim() || null,
      referral_code: referral.trim() || null,
      source: "landing_form",
      user_agent:
        typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null,
    });
    setLoading(false);
    if (dbError) {
      // 23505 = unique violation: already on waitlist
      if ((dbError as { code?: string }).code === "23505") {
        onSubmit();
        return;
      }
      setError("Something went wrong. Please try again.");
      return;
    }
    onSubmit();
  };

  const handleGoogle = async () => {
    setError(null);
    setGoogleLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setGoogleLoading(false);
      setError("Couldn't sign in with Google. Try the email form below.");
      return;
    }
    if (result.redirected) return; // browser is redirecting
    // tokens received, session set — record signup using session email
    const { data: userData } = await supabase.auth.getUser();
    const userEmail = userData.user?.email?.toLowerCase();
    if (userEmail) {
      await supabase.from("waitlist_signups").insert({
        email: userEmail,
        role: role || null,
        university: university.trim() || null,
        referral_code: referral.trim() || null,
        source: "google_oauth",
        user_agent:
          typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null,
      });
    }
    setGoogleLoading(false);
    onSubmit();
  };

  return (
    <form
      onSubmit={handle}
      className="mx-auto w-full max-w-[480px] rounded-2xl border border-[var(--border)] bg-card p-7 shadow-soft sm:p-8"
    >
      <div className="space-y-4">
        <button
          type="button"
          onClick={handleGoogle}
          disabled={googleLoading}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-[var(--border)] bg-card px-4 py-3.5 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--background)] disabled:opacity-60"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.1A6.99 6.99 0 0 1 5.46 12c0-.73.13-1.44.38-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 4.93l3.66-2.83z"/>
            <path fill="#EA4335" d="M12 4.78c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.46 14.97.5 12 .5 7.7.5 3.99 2.97 2.18 6.57l3.66 2.83C6.71 6.71 9.14 4.78 12 4.78z"/>
          </svg>
          {googleLoading ? "Connecting…" : "Continue with Google"}
        </button>
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <span className="h-px flex-1 bg-[var(--border)]" />
          or
          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[var(--ink)]">
            Email address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="w-full rounded-xl border border-[var(--border)] bg-card px-4 py-3.5 text-base text-[var(--ink)] outline-none transition focus:border-[var(--orange-accent)] focus:ring-2 focus:ring-[var(--orange-accent)]/20"
          />
          <p className="mt-1.5 text-xs text-muted-foreground">
            Any email works. School email not required.
          </p>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
            I am a…
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
            Which university?
          </label>
          <input
            type="text"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            placeholder="e.g. UC Berkeley, UT Austin, NYU"
            className="w-full rounded-xl border border-[var(--border)] bg-card px-4 py-3 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--orange-accent)] focus:ring-2 focus:ring-[var(--orange-accent)]/20"
          />
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

        {error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive">
            {error}
          </div>
        )}

        <PrimaryButton type="submit" disabled={loading} className="mt-2 w-full">
          {loading ? "Joining…" : "Get Early Access"}
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </PrimaryButton>

        <p className="text-center text-xs text-muted-foreground">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </form>
  );
}

function SuccessState() {
  const [copied, setCopied] = useState(false);
  const referralLink = "nestu.app/r/u-2401";

  const copy = () => {
    navigator.clipboard?.writeText(`https://${referralLink}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const shareText = encodeURIComponent(
    "I just joined the NestU waitlist for student housing without the hassle. Join me:",
  );
  const waUrl = `https://wa.me/?text=${shareText}%20https://${referralLink}`;

  return (
    <div className="mx-auto w-full max-w-[480px] rounded-2xl border border-[var(--border)] bg-card p-8 text-center shadow-soft animate-fade-up">
      <div className="mx-auto mb-3 text-4xl">🎉</div>
      <h3 className="font-serif text-3xl text-[var(--ink)]">
        You're on the list!
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Share your link to move up the list when we launch.
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
          className="flex items-center justify-center rounded-xl bg-[#25D366] px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          WhatsApp
        </a>
        <button
          onClick={copy}
          className="flex items-center justify-center rounded-xl border border-[var(--border)] bg-card px-4 py-3 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--background)]"
        >
          Instagram
        </button>
      </div>
    </div>
  );
}

function Waitlist({
  submitted,
  setSubmitted,
}: {
  submitted: boolean;
  setSubmitted: (v: boolean) => void;
}) {
  return (
    <section id="waitlist" className="bg-tint py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-serif text-4xl text-[var(--ink)] sm:text-5xl">
          Get early access.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-lg text-muted-foreground">
          Join the waitlist. Be the first to find your place when we launch.
        </p>
        <div className="mt-10">
          {submitted ? <SuccessState /> : <WaitlistForm onSubmit={() => setSubmitted(true)} />}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[var(--border)]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-serif text-lg text-[var(--ink)] sm:text-xl">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[var(--ink)]/60 transition ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ${
          open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <p className="text-[15px] leading-relaxed text-muted-foreground">{a}</p>
        </div>
      </div>
    </div>
  );
}

function Faq() {
  const items = [
    {
      q: "Is NestU free to use?",
      a: "Yes. NestU is free for students, interns, international students, and young professionals. There are no broker fees and no charges to browse, match, or message.",
    },
    {
      q: "How does landlord verification work?",
      a: "Every landlord submits government ID and proof of ownership or management rights for the unit. Listings are reviewed before they go live. We remove anything that doesn't pass review.",
    },
    {
      q: "What makes the roommate matching accurate?",
      a: "We score compatibility across sleep schedule, cleanliness, budget, study habits, and lifestyle preferences. You only see people whose habits genuinely line up with yours.",
    },
    {
      q: "When does NestU launch at my university?",
      a: "We're rolling out campus by campus, starting Fall 2026. The most-requested schools from waitlist signups launch next, so adding your university when you join helps move it up.",
    },
    {
      q: "I'm a landlord. How do I list my property?",
      a: "Join the waitlist and select 'Landlord'. You'll get early access to list units to thousands of verified students with no middleman and no broker fees.",
    },
  ];
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <div className="text-center">
        <div className="text-sm uppercase tracking-[0.18em] text-[var(--orange-accent)]">
          FAQ
        </div>
        <h2 className="mt-3 font-serif text-4xl text-[var(--ink)] sm:text-5xl">
          Questions, answered.
        </h2>
      </div>
      <div className="mt-12">
        {items.map((it) => (
          <FaqItem key={it.q} {...it} />
        ))}
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer({ onJoin }: { onJoin: () => void }) {
  return (
    <footer className="bg-[var(--ink)] text-[var(--background)]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <Logo tone="light" />
          <button
            onClick={onJoin}
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--orange-accent)] px-5 py-3 text-sm font-medium text-white shadow-soft transition hover:opacity-95"
          >
            Get Early Access
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-[var(--background)]/60">
          <p>Coming to every university. © {new Date().getFullYear()} NestU.</p>
          <p className="mt-2 text-xs leading-relaxed text-[var(--background)]/45">
            NestU is a housing search platform. We are not a licensed real estate
            broker. Joining the waitlist does not constitute a lease, reservation, or
            commitment of any kind.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Page ---------------- */
function Index() {
  const [submitted, setSubmitted] = useState(false);

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Nav onJoin={scrollToWaitlist} />
      <Hero onJoin={scrollToWaitlist} />
      <TopMarquee />
      <ProblemBar />
      <HowItWorks />
      <Features />
      <WhoItsFor />
      <CtaMarquee />
      <Universities />
      <Testimonials />
      <Waitlist submitted={submitted} setSubmitted={setSubmitted} />
      <Faq />
      <Footer onJoin={scrollToWaitlist} />
    </div>
  );
}
