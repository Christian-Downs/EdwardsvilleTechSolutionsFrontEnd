import Link from "next/link";
import ContactForm from "./ui/contact-form";
import Counter from "./ui/counter";
import Estimator from "./ui/estimator";
import HeroTicket from "./ui/hero-ticket";
import Reveal from "./ui/reveal";
import ServiceTicket from "./ui/service-ticket";
import { exampleJobs, faqs, priceNote, process, services, site } from "@/lib/site";

const ticker = [
  "Websites",
  "AI helpers",
  "Phone receptionists",
  "Automation",
  "Custom tools",
  "Website upkeep",
  "Team training",
  "Spreadsheet rescue",
];

const houseRules = [
  { title: "Plain English", body: "If we can’t explain it without jargon, we don’t understand it well enough." },
  { title: "Price range up front", body: "Every service lists what it typically costs. The estimate is in writing." },
  { title: "You get the owner", body: "The person who picks up the phone is the person who does the work." },
  { title: "A reply in one business day", body: "No ticket queues and no phone trees." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* ---------- Hero ---------- */}
      <section className="drafting grain overflow-hidden border-b-2 border-ink">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-10 lg:pb-28 lg:pt-20">
          <div>
            <p className="label text-blueprint">Edwardsville, Ill. — serving the Metro East &amp; St. Louis</p>
            <h1 className="headline mt-5 text-[clamp(3.25rem,9vw,7rem)]">
              Tech help that works like a good{" "}
              <span className="relative inline-block whitespace-nowrap text-stamp">
                repair shop.
                <svg
                  viewBox="0 0 300 14"
                  preserveAspectRatio="none"
                  className="absolute -bottom-2 left-0 h-3 w-full"
                  aria-hidden="true"
                >
                  <path
                    d="M2 9 C 50 2, 90 12, 150 6 S 250 3, 298 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
              Tell us what’s eating your time. We write it up in plain English, give you a straight price range, and fix
              it — with a website, an AI helper or a tool built just for your business.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/contact" className="btn btn-red">
                Book a call
              </Link>
              <a href="#estimate" className="btn btn-paper">
                See what it’d save you
              </a>
            </div>
            <p className="note mt-9 hidden text-2xl text-blueprint lg:block">every job starts with a write-up like this →</p>
          </div>
          <HeroTicket />
        </div>
      </section>

      {/* ---------- Ticker ---------- */}
      <div className="overflow-hidden border-b-2 border-ink bg-ink py-3 text-paper" aria-hidden="true">
        <div className="ticker">
          {[...ticker, ...ticker, ...ticker, ...ticker].map((t, i) => (
            <span key={i} className="headline flex items-center text-2xl tracking-wide">
              <span className="px-6">{t}</span>
              <span className="text-carbon-yellow">✕</span>
            </span>
          ))}
        </div>
      </div>

      {/* ---------- House rules ---------- */}
      <section className="border-b-2 border-ink bg-paper-light">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <p className="label text-stamp">House rules</p>
          <ol className="mt-6 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {houseRules.map((rule, i) => (
              <Reveal as="li" key={rule.title} delay={i * 90} className="border-t-[3px] border-ink pt-4">
                <span className="font-mono text-sm text-ink-faint">0{i + 1}</span>
                <h2 className="headline mt-1 text-3xl">{rule.title}</h2>
                <p className="mt-2 text-[0.95rem] text-ink-soft">{rule.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section id="services" className="grain">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="max-w-3xl">
            <p className="label text-stamp">Services</p>
            <h2 className="headline mt-3 text-6xl sm:text-7xl">Pick your ticket.</h2>
            <p className="mt-5 text-lg text-ink-soft">
              You don’t need to know what it’s called. Find the complaint that sounds like yours.
            </p>
          </div>

          <div className="mt-14 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 110} tilt={i % 2 ? 1.5 : -1.5}>
                <ServiceTicket service={s} />
              </Reveal>
            ))}
            <Reveal delay={220} tilt={1.5}>
              <Link
                href="/contact"
                className="flex h-full min-h-[20rem] flex-col justify-between border-[1.5px] border-ink bg-stamp p-6 text-white shadow-ticket transition duration-200 hover:-translate-y-1.5 hover:rotate-1 hover:shadow-lift"
              >
                <p className="label text-white/80">None of these?</p>
                <div>
                  <p className="headline text-5xl">Not sure what you need?</p>
                  <p className="mt-4 text-white/90">That’s normal. Describe the headache and we’ll work out the rest.</p>
                  <p className="label mt-6 inline-block border-b-2 border-white pb-0.5">Book a call →</p>
                </div>
              </Link>
            </Reveal>
          </div>
          <p className="mt-10 max-w-2xl font-mono text-sm text-ink-soft">* {priceNote}</p>
        </div>
      </section>

      {/* ---------- Savings estimator ---------- */}
      <section id="estimate" className="grain border-y-2 border-ink bg-paper-dark">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="max-w-3xl">
            <p className="label text-stamp">Savings estimate</p>
            <h2 className="headline mt-3 text-6xl sm:text-7xl">What’s that chore costing you?</h2>
            <p className="mt-5 text-lg text-ink-soft">
              Pick one job you do over and over. Ring it up and see what it adds to in a year.
            </p>
          </div>
          <div className="mt-14">
            <Estimator />
          </div>
        </div>
      </section>

      {/* ---------- Process (blueprint) ---------- */}
      <section id="process" className="blueprint border-b-2 border-ink">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label text-carbon-yellow">Sheet 1 of 1 — the process</p>
              <h2 className="headline mt-3 text-6xl text-white sm:text-7xl">How a job runs.</h2>
            </div>
            <p className="note max-w-xs text-2xl text-blueprint-line">no surprises, no mystery invoices</p>
          </div>

          <Reveal className="mt-16">
            {/* dimension line */}
            <svg
              viewBox="0 0 1200 30"
              preserveAspectRatio="none"
              className="hidden h-8 w-full lg:block"
              aria-hidden="true"
            >
              <path
                className="draw-line"
                style={{ ["--len" as string]: 1300 }}
                d="M4 15 H1196 M4 3 V27 M1196 3 V27 M304 8 V22 M600 8 V22 M896 8 V22"
                fill="none"
                stroke="#C9DBFF"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <ol className="grid gap-10 lg:mt-6 lg:grid-cols-4 lg:gap-8">
              {process.map((step, i) => (
                <li key={step.title} className="relative border-l-2 border-blueprint-line/60 pl-6 lg:border-l-0 lg:pl-0">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-blueprint-line font-mono text-xl text-white">
                    {i + 1}
                  </span>
                  <h3 className="headline mt-5 text-4xl text-white">{step.title}</h3>
                  <p className="note mt-1 text-xl text-carbon-yellow">({step.note})</p>
                  <p className="mt-3 max-w-xs text-blueprint-line">{step.description}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ---------- Job files ---------- */}
      <section id="jobs" className="grain">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <p className="label text-stamp">Job files</p>
          <h2 className="headline mt-3 text-6xl sm:text-7xl">Out of the filing cabinet.</h2>

          <Reveal className="mt-14 max-w-4xl">
            {/* manila folder */}
            <div className="relative">
              <div className="label ml-6 inline-block rounded-t-md border-[1.5px] border-b-0 border-ink bg-carbon-yellow px-5 py-2">
                Job file — local daycare
              </div>
              <div className="relative border-[1.5px] border-ink bg-[#EFD9A0] p-6 shadow-ticket sm:p-10">
                <div className="grid gap-8 sm:grid-cols-[1fr_1.3fr]">
                  <div>
                    <p className="label text-ink-soft">Customer said</p>
                    <p className="note mt-2 text-2xl text-blueprint">
                      “We need the website to stay up. We don’t need another monthly bill.”
                    </p>
                  </div>
                  <div>
                    <p className="label text-ink-soft">Work done</p>
                    <p className="mt-2 text-lg leading-relaxed">
                      We keep the daycare’s website up and running without a subscription, so the cost of having a
                      website stays very low. When something needs changing, they ask and it gets done.
                    </p>
                    <Link
                      href="/services/websites"
                      className="label mt-5 inline-block border-b-2 border-stamp pb-0.5"
                    >
                      Websites &amp; upkeep →
                    </Link>
                  </div>
                </div>
                <span
                  className="stamp stamp-on-reveal absolute -top-5 right-4 text-2xl sm:right-10 sm:text-3xl"
                  style={{ ["--stamp-gap" as string]: "#EFD9A0" }}
                >
                  No subscription
                </span>
              </div>
            </div>
          </Reveal>

          <div className="mt-20">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 className="headline text-4xl">On the bench</h3>
              <p className="font-mono text-sm text-ink-soft">
                Example write-ups — the kind of job we take on. Not client results.
              </p>
            </div>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {exampleJobs.map((job, i) => (
                <Reveal key={job.shop} delay={i * 110} className="ticket flex flex-col p-5">
                  <div className="flex items-center justify-between">
                    <span className="headline text-2xl">{job.shop}</span>
                    <span className="label border border-ink/50 px-1.5 py-0.5 text-ink-soft">Example</span>
                  </div>
                  <p className="note mt-4 text-xl text-blueprint">“{job.complaint}”</p>
                  <p className="mt-4 flex-1 text-[0.95rem]">{job.work}</p>
                  <p className="label mt-5 border-t border-dashed border-ink/40 pt-3 text-ink-soft">{job.category}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Live AI helper (only when configured) ---------- */}
      <Counter />

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="border-t-2 border-ink bg-paper-light">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:py-28">
          <div>
            <p className="label text-stamp">Questions</p>
            <h2 className="headline mt-3 text-6xl sm:text-7xl">Straight answers.</h2>
          </div>
          <div className="border-t-2 border-ink">
            {faqs.map((faq) => (
              <details key={faq.question} className="group border-b-2 border-ink">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="headline text-2xl sm:text-3xl">{faq.question}</span>
                  <span className="headline text-4xl text-stamp transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 text-lg text-ink-soft">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Book a call ---------- */}
      <section id="contact" className="drafting grain border-t-2 border-ink">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:py-28">
          <div>
            <p className="label text-stamp">Book a call</p>
            <h2 className="headline mt-3 text-6xl sm:text-7xl">Bring us the headache.</h2>
            <p className="mt-5 max-w-md text-lg text-ink-soft">
              A free call, usually twenty minutes. You describe the problem, we tell you honestly whether we can help and
              roughly what it would cost.
            </p>
            <dl className="mt-8 space-y-4 font-mono">
              <div>
                <dt className="label text-ink-soft">Phone</dt>
                <dd>
                  <a href={site.phoneHref} className="text-xl hover:text-stamp">
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label text-ink-soft">Email</dt>
                <dd>
                  <a href={`mailto:${site.email}`} className="break-all hover:text-stamp">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label text-ink-soft">Shop</dt>
                <dd>{site.city}</dd>
              </div>
            </dl>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
