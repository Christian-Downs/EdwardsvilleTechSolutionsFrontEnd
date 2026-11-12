"use client";

import Link from "next/link";
import { useState } from "react";
import Seal from "./seal";

const links = [
  { name: "Services", href: "/#services" },
  { name: "Savings estimate", href: "/#estimate" },
  { name: "Job files", href: "/#jobs" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6" aria-label="Main">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Seal className="h-10 w-10 shrink-0" />
          <span className="leading-none">
            <span className="headline block text-xl sm:text-2xl">Edwardsville Tech</span>
            <span className="label block text-ink-soft">
              Solutions<span className="hidden sm:inline"> · Edwardsville, Ill.</span>
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.name}
              href={l.href}
              className="label text-[0.75rem] text-ink decoration-stamp decoration-2 underline-offset-8 hover:underline"
            >
              {l.name}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-red !px-4 !py-2 !text-base">
            Book a call
          </Link>
        </div>

        <button
          type="button"
          className="label border-2 border-ink bg-paper-light px-3 py-2 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t-2 border-ink bg-paper-light px-4 pb-5 pt-2 lg:hidden">
          <ul>
            {links.map((l) => (
              <li key={l.name} className="border-b border-dashed border-ink/40">
                <Link href={l.href} className="headline block py-3 text-2xl" onClick={() => setOpen(false)}>
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contact" className="btn btn-red mt-5 w-full" onClick={() => setOpen(false)}>
            Book a call
          </Link>
        </div>
      )}
    </header>
  );
}
