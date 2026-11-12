"use client";

import { useEffect, useState } from "react";

const jobs = [
  {
    no: "0417",
    customer: "Owner-run shop, Main St.",
    complaint: "Phone rings while we're with customers. We lose the call.",
    work: "Phone helper that answers, takes the details and books the appointment.",
    stamp: "Written up",
  },
  {
    no: "0418",
    customer: "Family business, 6 staff",
    complaint: "Website costs money every month and we can't change it.",
    work: "Move to a site you own. Upkeep by text message.",
    stamp: "No subscription",
  },
  {
    no: "0419",
    customer: "Two-person office",
    complaint: "Same order typed into three programs. Every. Single. Day.",
    work: "Connect all three so it's typed once.",
    stamp: "Typed once",
  },
];

const HOLD_MS = 4200;
const TYPE_MS = 26;

/** The work order in the hero. Types out a new sample job every few seconds. */
export default function HeroTicket() {
  const [index, setIndex] = useState(0);
  // Number of characters typed so far across complaint + work. Starts complete so the
  // first job is readable without JavaScript.
  const [typed, setTyped] = useState(Infinity);

  const job = jobs[index];
  const total = job.complaint.length + job.work.length;
  const done = typed >= total;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (done) {
      const t = setTimeout(() => {
        setIndex((i) => (i + 1) % jobs.length);
        setTyped(0);
      }, HOLD_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setTyped((n) => n + 1), TYPE_MS);
    return () => clearTimeout(t);
  }, [typed, done]);

  const complaint = job.complaint.slice(0, typed);
  const work = typed > job.complaint.length ? job.work.slice(0, typed - job.complaint.length) : "";
  const typingComplaint = !done && typed <= job.complaint.length;

  return (
    <div className="relative mx-auto w-full max-w-md lg:rotate-2" aria-label="Sample work order">
      {/* carbon copies peeking out underneath */}
      <div className="absolute inset-0 translate-x-3 translate-y-4 rotate-2 border-[1.5px] border-ink bg-carbon-pink" />
      <div className="absolute inset-0 translate-x-1.5 translate-y-2 rotate-1 border-[1.5px] border-ink bg-carbon-yellow" />

      <div className="ticket">
        <div className="flex items-center justify-between bg-ink px-5 py-3 text-paper">
          <span className="headline text-2xl tracking-wide">Work order</span>
          <span className="font-mono text-sm text-carbon-yellow">No. {job.no}</span>
        </div>

        <div className="space-y-4 px-5 pb-5 pt-4">
          <div className="grid grid-cols-[1fr_auto] gap-4">
            <div className="field">
              <p className="label text-ink-soft">Customer</p>
              <p className="font-mono text-sm">{job.customer}</p>
            </div>
            <div className="field">
              <p className="label text-ink-soft">Taken by</p>
              <p className="font-mono text-sm">The owner</p>
            </div>
          </div>

          <div className="field min-h-[5.5rem]">
            <p className="label text-ink-soft">Customer says</p>
            <p className={`note mt-1 text-xl text-blueprint ${typingComplaint ? "caret" : ""}`}>{complaint}</p>
          </div>
        </div>

        <div className="perf" style={{ ["--perf-bg" as string]: "#F4EEDF" }} />

        <div className="relative px-5 pb-6 pt-4">
          <div className="min-h-[5.5rem]">
            <p className="label text-ink-soft">Work to be done</p>
            <p className={`mt-1 font-mono text-[0.95rem] leading-snug ${!done && !typingComplaint ? "caret" : ""}`}>
              {work}
            </p>
          </div>
          <div className="mt-3 flex items-end justify-between">
            <div>
              <p className="label text-ink-soft">Estimate</p>
              <p className="font-mono text-sm">In writing, before work starts</p>
            </div>
          </div>
          {done && (
            <span key={index} className="stamp stamp-slam absolute bottom-5 right-4 text-2xl">
              {job.stamp}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
