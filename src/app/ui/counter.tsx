"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const starters = [
  "I run a small shop. Where would AI actually help?",
  "What does a website cost?",
  "Can something answer my phone after hours?",
];

const MAX_TURNS = 8;

/**
 * "Ring the bell" — a live AI helper at the front counter.
 * Only shows up when the server has an API key configured (see /api/counter).
 */
export default function Counter() {
  const [enabled, setEnabled] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [ringing, setRinging] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/counter")
      .then((r) => r.json())
      .then((d) => setEnabled(Boolean(d.enabled)))
      .catch(() => setEnabled(false));
  }, []);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  if (!enabled) return null;

  const userTurns = messages.filter((m) => m.role === "user").length;
  const atLimit = userTurns >= MAX_TURNS;

  async function send(text: string) {
    const content = text.trim().slice(0, 500);
    if (!content || busy || atLimit) return;
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setError("");
    setBusy(true);
    setRinging(true);
    setTimeout(() => setRinging(false), 500);
    try {
      const res = await fetch("/api/counter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (!res.ok || !data.reply) throw new Error(data.error || "failed");
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch {
      setError("The counter helper is tied up right now. Booking a call is the sure way to reach us.");
    } finally {
      setBusy(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <section id="counter" className="grain border-t-2 border-ink bg-paper-dark">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <p className="label text-stamp">Try one yourself</p>
          <h2 className="headline mt-3 text-5xl sm:text-6xl">Ring the bell.</h2>
          <p className="mt-5 max-w-md text-lg text-ink-soft">
            This is a real AI helper, the same kind we build for customers. Ask it about your business and see how it
            handles it.
          </p>
          <p className="note mt-6 max-w-sm text-xl text-blueprint">
            ← it knows our services and price ranges. It can’t book or bill anything.
          </p>
        </div>

        <div className="ticket flex flex-col">
          <div className="flex items-center justify-between bg-ink px-5 py-3 text-paper">
            <span className="headline text-2xl tracking-wide">Front counter</span>
            <svg viewBox="0 0 48 40" className={`h-8 w-9 ${ringing ? "bell-ring" : ""}`} aria-hidden="true">
              <rect x="20" y="2" width="8" height="5" rx="2" fill="#F5DC6B" />
              <path d="M6 30a18 18 0 0 1 36 0z" fill="#F5DC6B" />
              <rect x="2" y="31" width="44" height="6" rx="2" fill="#FBF8EF" />
            </svg>
          </div>

          <div ref={logRef} className="max-h-[26rem] min-h-[16rem] space-y-4 overflow-y-auto px-5 py-5" aria-live="polite">
            {messages.length === 0 && (
              <div className="space-y-2">
                <p className="label text-ink-soft">Not sure what to ask? Try one:</p>
                {starters.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="block w-full border border-dashed border-ink/50 px-3 py-2 text-left font-mono text-sm hover:border-solid hover:bg-carbon-yellow"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            {messages.map((m, i) =>
              m.role === "user" ? (
                <p key={i} className="note ml-auto w-fit max-w-[85%] text-xl text-blueprint">
                  {m.content}
                </p>
              ) : (
                <p key={i} className="max-w-[92%] whitespace-pre-wrap border-l-4 border-stamp pl-3 font-mono text-sm leading-relaxed">
                  {m.content}
                </p>
              )
            )}
            {busy && <p className="caret font-mono text-sm text-ink-soft">Checking the shelf</p>}
            {error && <p className="bg-carbon-pink px-3 py-2 font-mono text-sm">{error}</p>}
          </div>

          <div className="perf" style={{ ["--perf-bg" as string]: "#E8DDC4" }} />

          {atLimit ? (
            <div className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-ink-soft">That’s the limit for the demo. A person can take it from here.</p>
              <Link href="/contact" className="btn btn-red !text-base">
                Book a call
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex items-end gap-3 px-5 py-4">
              <label htmlFor="counter-input" className="sr-only">
                Your question
              </label>
              <input
                id="counter-input"
                className="input"
                value={input}
                maxLength={500}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask in plain English…"
              />
              <button type="submit" disabled={busy || !input.trim()} className="btn btn-ink !px-4 !py-2 !text-base">
                Ask
              </button>
            </form>
          )}
          <p className="label border-t border-ink/20 px-5 py-2 text-ink-faint">
            AI helper · can be wrong · don’t share private details
          </p>
        </div>
      </div>
    </section>
  );
}
