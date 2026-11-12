import { describe, expect, it } from "vitest";
import { exampleJobs, faqs, getService, process as steps, services, site } from "@/lib/site";

const dollars = (s: string) => (s.match(/\$[\d,]+/g) ?? []).map((d) => Number(d.replace(/[$,]/g, "")));

describe("business details", () => {
  it("has a phone link that matches the printed number", () => {
    const digits = site.phone.replace(/\D/g, "");
    expect(digits).toHaveLength(10);
    expect(site.phoneHref).toBe(`tel:+1${digits}`);
  });

  it("has a valid email and https url without a trailing slash", () => {
    expect(site.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(site.url).toMatch(/^https:\/\/[^/]+$/);
  });
});

describe("services", () => {
  it("lists five services with unique slugs and work-order numbers", () => {
    expect(services).toHaveLength(5);
    expect(new Set(services.map((s) => s.slug)).size).toBe(services.length);
    expect(new Set(services.map((s) => s.order)).size).toBe(services.length);
  });

  it.each(services.map((s) => [s.slug, s] as const))("%s is complete", (_slug, s) => {
    expect(s.slug).toMatch(/^[a-z0-9-]+$/);
    expect(s.order).toMatch(/^WO-\d{3}$/);
    for (const text of [s.title, s.short, s.complaint, s.fix, s.intro, s.metaTitle, s.metaDescription]) {
      expect(text.trim().length).toBeGreaterThan(0);
    }
    expect(s.items.length).toBeGreaterThanOrEqual(3);
    expect(s.goodFor.length).toBeGreaterThanOrEqual(2);
    expect(new Set(s.items.map((i) => i.name)).size).toBe(s.items.length);
  });

  it.each(services.map((s) => [s.slug, s] as const))("%s has search-friendly metadata", (_slug, s) => {
    expect(s.metaTitle.length).toBeLessThanOrEqual(60);
    expect(s.metaDescription.length).toBeGreaterThanOrEqual(70);
    expect(s.metaDescription.length).toBeLessThanOrEqual(200);
  });

  it.each(services.flatMap((s) => s.items.map((i) => [`${s.slug} / ${i.name}`, i] as const)))(
    "%s has a sensible price range",
    (_name, item) => {
      expect(item.range).toMatch(/^\$[\d,]+ – \$[\d,]+$/);
      const [low, high] = dollars(item.range);
      expect(low).toBeGreaterThan(0);
      expect(high).toBeGreaterThan(low);
      expect(item.plain.length).toBeGreaterThan(30);
    }
  );

  it.each(services.map((s) => [s.slug, s] as const))(
    "%s advertises its cheapest one-off job as the 'from' price",
    (_slug, s) => {
      // Monthly plans and hourly rates aren't "jobs", so they don't set the headline price.
      const oneOff = s.items.filter((i) => !/^per (month|hour)/.test(i.unit ?? ""));
      const cheapest = Math.min(...oneOff.map((i) => dollars(i.range)[0]));
      expect(s.from).toMatch(/^\$[\d,]+$/);
      expect(dollars(s.from)[0]).toBe(cheapest);
    }
  );

  it("looks services up by slug", () => {
    expect(getService("websites")?.title).toBe("Websites & upkeep");
    expect(getService("nope")).toBeUndefined();
  });
});

describe("supporting content", () => {
  it("has four process steps", () => {
    expect(steps.map((s) => s.title)).toEqual(["Write-up", "Estimate", "Build", "Upkeep"]);
  });

  it("has unique FAQ questions that end in a question mark", () => {
    expect(faqs.length).toBeGreaterThanOrEqual(5);
    expect(new Set(faqs.map((f) => f.question)).size).toBe(faqs.length);
    for (const f of faqs) {
      expect(f.question.endsWith("?")).toBe(true);
      expect(f.answer.length).toBeGreaterThan(20);
    }
  });

  it("keeps example jobs free of made-up numbers", () => {
    for (const job of exampleJobs) {
      expect(`${job.complaint} ${job.work}`).not.toMatch(/[%$]|\d+x\b/);
    }
  });

  it("does not bring back claims that were removed from the site", () => {
    const everything = JSON.stringify({ services, faqs, steps, exampleJobs }).toLowerCase();
    expect(everything).not.toContain("money-back");
    expect(everything).not.toContain("project manager");
    expect(everything).not.toContain("guarantee");
  });
});
