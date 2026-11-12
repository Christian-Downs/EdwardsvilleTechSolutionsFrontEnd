"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { estimate } from "@/lib/estimate";

type Result = { task: string; hours: number; rate: number; share: number; key: number };

const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/** Rings up what a repetitive task costs in a year and prints it on a receipt. */
export default function Estimator() {
  const [task, setTask] = useState("Answering the same customer emails");
  const [hours, setHours] = useState(5);
  const [rate, setRate] = useState(30);
  const [share, setShare] = useState(60);
  const [result, setResult] = useState<Result | null>(null);

  function ringUp(e: FormEvent) {
    e.preventDefault();
    setResult({ task: task.trim() || "Repetitive task", hours, rate, share, key: Date.now() });
  }

  const { yearHours, yearCost, savedHours, savedMoney, workDays } = estimate(
    result ?? { hours: 0, rate: 0, share: 0 }
  );

  const note = result
    ? `Task: ${result.task}. About ${result.hours} hrs/week. Estimator says roughly ${savedHours} hours a year could be handed off.`
    : "";

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,22rem)] lg:gap-16">
      <form onSubmit={ringUp} className="ticket self-start p-6 sm:p-8">
        <p className="label text-ink-soft">Step 1 — Tell us about one chore</p>

        <label htmlFor="est-task" className="label mt-6 block text-ink">
          What’s the chore?
        </label>
        <input
          id="est-task"
          className="input"
          value={task}
          maxLength={60}
          onChange={(e) => setTask(e.target.value)}
          placeholder="e.g. Sending appointment reminders"
        />

        <div className="mt-7">
          <div className="flex items-baseline justify-between">
            <label htmlFor="est-hours" className="label text-ink">
              Hours a week it eats
            </label>
            <output className="headline text-3xl">{hours} hr</output>
          </div>
          <input
            id="est-hours"
            type="range"
            min={1}
            max={40}
            value={hours}
            onChange={(e) => setHours(+e.target.value)}
            className="mt-2 w-full accent-stamp"
          />
        </div>

        <div className="mt-7">
          <div className="flex items-baseline justify-between">
            <label htmlFor="est-rate" className="label text-ink">
              What an hour of that time is worth
            </label>
            <output className="headline text-3xl">${rate}</output>
          </div>
          <input
            id="est-rate"
            type="range"
            min={15}
            max={150}
            step={5}
            value={rate}
            onChange={(e) => setRate(+e.target.value)}
            className="mt-2 w-full accent-stamp"
          />
        </div>

        <div className="mt-7">
          <div className="flex items-baseline justify-between">
            <label htmlFor="est-share" className="label text-ink">
              How much of it is pure routine
            </label>
            <output className="headline text-3xl">{share}%</output>
          </div>
          <input
            id="est-share"
            type="range"
            min={20}
            max={90}
            step={5}
            value={share}
            onChange={(e) => setShare(+e.target.value)}
            className="mt-2 w-full accent-stamp"
          />
          <p className="mt-2 text-sm text-ink-soft">
            The routine part is what a helper can take over. The judgment calls stay with you.
          </p>
        </div>

        <button type="submit" className="btn btn-ink mt-8 w-full">
          Ring it up
        </button>
      </form>

      {/* Receipt printer */}
      <div aria-live="polite">
        <div className="receipt-slot relative z-10 mx-auto w-full max-w-[21rem]" />
        <div className="mx-auto -mt-[7px] w-full max-w-[19.5rem] overflow-hidden">
          {result ? (
            <div key={result.key} className="receipt receipt-print px-5 pt-7 text-[0.8125rem] shadow-ticket">
              <p className="headline text-center text-2xl">Edwardsville Tech</p>
              <p className="text-center text-[0.6875rem] tracking-widest">WHAT THIS CHORE COSTS YOU</p>
              <p className="my-3 border-t border-dashed border-ink/50" />
              <p className="break-words font-medium uppercase">{result.task}</p>
              <dl className="mt-3 space-y-1.5">
                <Row k={`${result.hours} hr/wk × 52 wk`} v={`${yearHours} hr`} />
                <Row k={`× ${money(result.rate)}/hr`} v={money(yearCost)} />
                <Row k={`Routine share`} v={`${result.share}%`} />
              </dl>
              <p className="my-3 border-t border-dashed border-ink/50" />
              <dl className="space-y-1.5">
                <Row k="HOURS BACK / YEAR" v={`${savedHours} hr`} strong />
                <Row k="WORTH ABOUT" v={money(savedMoney)} strong />
              </dl>
              <p className="mt-3 text-center">
                That’s roughly <strong>{workDays}</strong> working {workDays === 1 ? "day" : "days"} a year.
              </p>
              <p className="my-3 border-t border-dashed border-ink/50" />
              <p className="text-[0.6875rem] leading-relaxed text-ink-soft">
                A rough estimate from your own numbers, not a quote or a promise. A real estimate comes after we’ve seen
                how the work is done.
              </p>
              <Link
                href={`/contact?note=${encodeURIComponent(note)}`}
                className="btn btn-red mt-5 w-full !text-base"
              >
                Bring this to a call
              </Link>
              <p className="mt-4 text-center text-[0.6875rem] tracking-widest">*** THANK YOU ***</p>
            </div>
          ) : (
            <div className="receipt px-5 pt-7 text-center text-[0.8125rem] text-ink-soft shadow-ticket">
              <p className="headline text-2xl text-ink">Edwardsville Tech</p>
              <p className="mt-6">Your receipt prints here.</p>
              <p className="mt-1">Fill in the chore and ring it up.</p>
              <p className="mt-6 text-[0.6875rem] tracking-widest">- - - - - - - - - -</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ k, v, strong }: { k: string; v: string; strong?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between gap-3 ${strong ? "text-[0.9375rem] font-medium" : ""}`}>
      <dt>{k}</dt>
      <dd className="tabular-nums">{v}</dd>
    </div>
  );
}
