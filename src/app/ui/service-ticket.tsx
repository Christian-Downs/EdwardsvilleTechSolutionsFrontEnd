import Link from "next/link";
import type { Service } from "@/lib/site";

/** A service shown as a work-order ticket. */
export default function ServiceTicket({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="ticket group flex h-full flex-col transition duration-200 hover:-translate-y-1.5 hover:-rotate-1 hover:shadow-lift"
    >
      <div className="flex items-center justify-between border-b-[1.5px] border-ink px-5 py-2.5">
        <span className="label text-ink-soft">Work order</span>
        <span className="font-mono text-sm font-medium text-stamp">{service.order}</span>
      </div>
      <div className="flex-1 px-5 pb-5 pt-4">
        <h3 className="headline text-4xl">{service.title}</h3>
        <p className="label mt-5 text-ink-soft">Customer says</p>
        <p className="note mt-1 text-xl text-blueprint">{service.complaint}</p>
      </div>
      <div className="perf" style={{ ["--perf-bg" as string]: "#F4EEDF" }} />
      <div className="px-5 pb-5 pt-4">
        <p className="label text-ink-soft">What we do</p>
        <p className="mt-1 text-[0.95rem] leading-snug">{service.fix}</p>
        <div className="mt-5 flex items-end justify-between">
          <p>
            <span className="label block text-ink-soft">Jobs from</span>
            <span className="headline text-3xl">{service.from}</span>
          </p>
          <span className="label border-b-2 border-stamp pb-0.5 text-ink transition-all group-hover:pr-3">
            Open ticket →
          </span>
        </div>
      </div>
    </Link>
  );
}
