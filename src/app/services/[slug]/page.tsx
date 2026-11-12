import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "../../ui/reveal";
import { getService, priceNote, services, site } from "@/lib/site";

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const service = getService(params.slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.metaTitle} | ${site.name}`,
      description: service.metaDescription,
      url: `${site.url}/services/${service.slug}`,
    },
  };
}

export default function ServicePage({ params }: Props) {
  const service = getService(params.slug);
  if (!service) notFound();
  const others = services.filter((s) => s.slug !== service.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    url: `${site.url}/services/${service.slug}`,
    areaServed: ["Edwardsville, IL", "Metro East", "St. Louis, MO"],
    provider: { "@type": "LocalBusiness", name: site.name, url: site.url, telephone: "+1-518-879-6827" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.title,
      itemListElement: service.items.map((i) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: i.name, description: i.plain },
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="drafting grain border-b-2 border-ink">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:pb-24 lg:pt-16">
          <p className="label text-ink-soft">
            <Link href="/#services" className="hover:text-stamp">
              Services
            </Link>{" "}
            / <span className="text-stamp">{service.order}</span>
          </p>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <h1 className="headline text-[clamp(3rem,8vw,6.5rem)]">{service.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">{service.intro}</p>
              <Link href="/contact" className="btn btn-red mt-8">
                Book a call
              </Link>
            </div>
            <div className="ticket rotate-1 p-6">
              <p className="label text-ink-soft">Customer says</p>
              <p className="note mt-2 text-2xl text-blueprint">{service.complaint}</p>
              <div className="perf my-5 -mx-6" style={{ ["--perf-bg" as string]: "#F4EEDF" }} />
              <p className="label text-ink-soft">What we do</p>
              <p className="mt-2 text-lg leading-snug">{service.fix}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Estimate sheet */}
      <section className="grain">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <p className="label text-stamp">Estimate sheet</p>
          <h2 className="headline mt-3 text-5xl sm:text-6xl">What’s on the menu, and what it runs.</h2>

          <Reveal className="ticket mt-10">
            <div className="hidden grid-cols-[1.1fr_2fr_1fr] gap-6 bg-ink px-6 py-3 text-paper md:grid">
              <span className="label">Item</span>
              <span className="label">What it is, in plain English</span>
              <span className="label text-right">Typical range</span>
            </div>
            <ul>
              {service.items.map((item, i) => (
                <li
                  key={item.name}
                  className={`grid gap-x-6 gap-y-2 px-5 py-6 sm:px-6 md:grid-cols-[1.1fr_2fr_1fr] ${
                    i > 0 ? "border-t border-dashed border-ink/40" : ""
                  }`}
                >
                  <div>
                    <h3 className="headline text-3xl">{item.name}</h3>
                    {item.alsoCalled && (
                      <p className="mt-1 font-mono text-xs text-ink-faint">Tech name: {item.alsoCalled}</p>
                    )}
                  </div>
                  <p className="text-[1.05rem] leading-relaxed text-ink-soft">{item.plain}</p>
                  <p className="md:text-right">
                    <span className="block font-mono text-lg font-medium">{item.range}</span>
                    {item.unit && <span className="font-mono text-xs text-ink-soft">{item.unit}</span>}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
          <p className="mt-6 max-w-2xl font-mono text-sm text-ink-soft">* {priceNote}</p>
        </div>
      </section>

      {/* Good for */}
      <section className="blueprint border-y-2 border-ink">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:py-20">
          <div>
            <p className="label text-carbon-yellow">Good fit</p>
            <h2 className="headline mt-3 text-5xl text-white sm:text-6xl">This is for you if…</h2>
          </div>
          <ul className="space-y-5">
            {service.goodFor.map((g) => (
              <li key={g} className="flex items-start gap-4 text-xl text-white">
                <svg viewBox="0 0 28 28" className="mt-0.5 h-7 w-7 shrink-0" aria-hidden="true">
                  <rect x="2" y="2" width="24" height="24" fill="none" stroke="#C9DBFF" strokeWidth="2" />
                  <path d="M6 14 l6 7 L25 3" fill="none" stroke="#F5DC6B" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
                {g}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA + other tickets */}
      <section className="grain">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="flex flex-col items-start justify-between gap-8 border-[1.5px] border-ink bg-carbon-yellow p-8 shadow-ticket sm:p-12 lg:flex-row lg:items-center">
            <div>
              <h2 className="headline text-5xl sm:text-6xl">Sound like your shop?</h2>
              <p className="mt-3 max-w-xl text-lg">
                Book a free call. You’ll get an honest answer and a written estimate before any work starts.
              </p>
            </div>
            <Link href="/contact" className="btn btn-ink shrink-0">
              Book a call
            </Link>
          </div>

          <p className="label mt-16 text-stamp">Other tickets</p>
          <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
            {others.map((o) => (
              <li key={o.slug} className="border-b-2 border-ink">
                <Link href={`/services/${o.slug}`} className="group flex items-baseline justify-between gap-4 py-4">
                  <span className="headline text-3xl group-hover:text-stamp">{o.title}</span>
                  <span className="font-mono text-sm text-ink-soft">{o.order} →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
