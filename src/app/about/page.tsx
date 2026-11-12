import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Edwardsville Tech Solutions is an owner-led tech shop in Edwardsville, IL helping small businesses with websites, AI helpers and custom tools — in plain English.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="drafting grain border-b-2 border-ink">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:py-24">
          <div>
            <p className="label text-stamp">About the shop</p>
            <h1 className="headline mt-4 text-[clamp(3rem,8vw,6.5rem)]">Small on purpose. Local on purpose.</h1>
            <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-ink-soft sm:text-xl">
              <p>
                {site.name} is owner-led. When you call, you get the person who will actually do the work — not a
                salesperson, not a call center.
              </p>
              <p>
                We started this shop because small businesses kept getting the same raw deal from tech: monthly fees
                for things they should own, jargon instead of answers, and tools built for companies fifty times their
                size.
              </p>
              <p>
                So we work the way a good repair shop does. You describe the problem. We write it up in plain English,
                tell you what it’ll cost, and fix it. If AI is the right tool, we’ll use it. If it isn’t, we’ll say so.
              </p>
              <p>We’re based in Edwardsville and work with owner-run businesses across the Metro East and the St. Louis area.</p>
            </div>
            <Link href="/contact" className="btn btn-red mt-9">
              Book a call
            </Link>
          </div>

          {/* shop ID badge */}
          <div className="relative mx-auto w-full max-w-xs rotate-2">
            <div className="mx-auto h-8 w-16 rounded-t-md border-[1.5px] border-b-0 border-ink bg-ink-soft" />
            <div className="ticket p-4">
              <div className="relative aspect-square border-[1.5px] border-ink">
                <Image src="/me.jpg" alt="The owner of Edwardsville Tech Solutions" fill sizes="320px" className="object-cover" priority />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="label text-ink-soft">Position</p>
                  <p className="headline text-3xl">Owner</p>
                  <p className="font-mono text-xs text-ink-soft">Also: builder, support line</p>
                </div>
                <span className="stamp stamp-blue text-lg">On duty</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blueprint">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <p className="label text-carbon-yellow">What you can count on</p>
          <ul className="mt-8 grid gap-10 md:grid-cols-3">
            {[
              ["You own what we build", "Your site, your tools, your accounts. Nothing is held hostage."],
              ["No jargon", "If something needs explaining, it gets explained in everyday words."],
              ["Honest about AI", "It’s a tool, not magic. We’ll tell you where it helps and where it doesn’t."],
            ].map(([title, body]) => (
              <li key={title} className="border-t-2 border-blueprint-line pt-4">
                <h2 className="headline text-4xl text-white">{title}</h2>
                <p className="mt-2 text-lg text-blueprint-line">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
