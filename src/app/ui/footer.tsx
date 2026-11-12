import Link from "next/link";
import { services, site } from "@/lib/site";
import Seal from "./seal";

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Seal className="h-12 w-12" />
            <p className="headline text-3xl">{site.name}</p>
          </div>
          <p className="mt-4 max-w-sm text-sm text-paper/75">
            Websites, AI helpers and custom tools for owner-run businesses in {site.area}. Owner-led. Plain English.
          </p>
        </div>
        <div>
          <p className="label text-carbon-yellow">Services</p>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-carbon-yellow">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label text-carbon-yellow">The counter</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>{site.city}</li>
            <li>
              <a href={site.phoneHref} className="hover:text-carbon-yellow">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="break-all hover:text-carbon-yellow">
                {site.email}
              </a>
            </li>
            <li className="pt-2">
              <Link href="/about" className="hover:text-carbon-yellow">
                About
              </Link>
              {" · "}
              <Link href="/contact" className="hover:text-carbon-yellow">
                Book a call
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/20">
        <p className="label mx-auto max-w-7xl px-4 py-5 text-paper/60 sm:px-6">
          © {new Date().getFullYear()} {site.name} · Thank you for your business
        </p>
      </div>
    </footer>
  );
}
