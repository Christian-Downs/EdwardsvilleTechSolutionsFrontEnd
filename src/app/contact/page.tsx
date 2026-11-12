import type { Metadata } from "next";
import ContactForm from "../ui/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Call",
  description:
    "Book a free call with Edwardsville Tech Solutions. Describe the problem in plain English and get an honest answer and a written estimate.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="drafting grain">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:py-24">
        <div>
          <p className="label text-stamp">Book a call</p>
          <h1 className="headline mt-4 text-[clamp(3rem,8vw,6rem)]">Bring us the headache.</h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft sm:text-xl">
            A free call, usually twenty minutes. You describe the problem, we tell you honestly whether we can help and
            roughly what it would cost.
          </p>
          <ol className="mt-8 max-w-md space-y-3 font-mono text-sm">
            <li>1. Fill in the slip.</li>
            <li>2. We reply within one business day to set a time.</li>
            <li>3. After the call you get a written estimate. No obligation.</li>
          </ol>
          <dl className="mt-10 space-y-4 font-mono">
            <div>
              <dt className="label text-ink-soft">Rather just call?</dt>
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
          </dl>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
