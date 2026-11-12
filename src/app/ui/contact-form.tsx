"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { site } from "@/lib/site";

const empty = { name: "", business: "", email: "", phone: "", bestTime: "", message: "", website: "" };

type Status = { kind: "ok" | "error"; text: string } | null;

/** Book-a-call request, laid out like the top copy of a work order. */
export default function ContactForm() {
  const [values, setValues] = useState(empty);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  // The savings estimator links here with ?note=... so the request arrives with context.
  useEffect(() => {
    const note = new URLSearchParams(window.location.search).get("note");
    if (note) setValues((v) => ({ ...v, message: note.slice(0, 600) }));
  }, []);

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(String(res.status));
      setValues(empty);
      setStatus({ kind: "ok", text: "Got it. We’ll be in touch within one business day to set up your call." });
    } catch {
      setStatus({
        kind: "error",
        text: `That didn’t go through. Please call ${site.phone} or email ${site.email} instead.`,
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="ticket relative">
      <div className="flex items-center justify-between bg-ink px-5 py-3 text-paper sm:px-7">
        <span className="headline text-2xl tracking-wide">Call request</span>
        <span className="font-mono text-xs text-carbon-yellow">Free · No obligation</span>
      </div>

      <div className="grid gap-x-6 gap-y-5 px-5 py-6 sm:grid-cols-2 sm:px-7">
        <div>
          <label htmlFor="name" className="label text-ink-soft">
            Your name
          </label>
          <input id="name" name="name" required autoComplete="name" className="input" value={values.name} onChange={onChange} />
        </div>
        <div>
          <label htmlFor="business" className="label text-ink-soft">
            Business
          </label>
          <input
            id="business"
            name="business"
            autoComplete="organization"
            className="input"
            value={values.business}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="email" className="label text-ink-soft">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="input"
            value={values.email}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="phone" className="label text-ink-soft">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className="input"
            value={values.phone}
            onChange={onChange}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="bestTime" className="label text-ink-soft">
            Best time to call
          </label>
          <select id="bestTime" name="bestTime" className="input" value={values.bestTime} onChange={onChange}>
            <option value="">Any time, Mon–Fri</option>
            <option>Mornings</option>
            <option>Around lunch</option>
            <option>Afternoons</option>
            <option>After closing time</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="label text-ink-soft">
            What’s eating your time?
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            maxLength={2000}
            className="input resize-y"
            placeholder="Plain English is perfect. No need to know the tech."
            value={values.message}
            onChange={onChange}
          />
        </div>

        {/* Honeypot: hidden from people, tempting to bots */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={onChange} />
        </div>
      </div>

      <div className="perf" style={{ ["--perf-bg" as string]: "#F4EEDF" }} />

      <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <p className="max-w-xs text-sm text-ink-soft">We reply within one business day. Your details are only used to call you back.</p>
        <button type="submit" disabled={sending} className="btn btn-red shrink-0">
          {sending ? "Sending…" : "Book my call"}
        </button>
      </div>

      {status && (
        <p
          role="status"
          className={`border-t-[1.5px] border-ink px-5 py-4 font-mono text-sm sm:px-7 ${
            status.kind === "ok" ? "bg-carbon-yellow" : "bg-carbon-pink"
          }`}
        >
          {status.text}
        </p>
      )}
    </form>
  );
}
