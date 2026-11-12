import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { services, site } from "@/lib/site";

describe("sitemap", () => {
  const entries = sitemap();
  const urls = entries.map((e) => e.url);

  it("lists the home page, every service page, contact and about", () => {
    expect(urls).toEqual([
      site.url,
      ...services.map((s) => `${site.url}/services/${s.slug}`),
      `${site.url}/contact`,
      `${site.url}/about`,
    ]);
  });

  it("contains only real pages, no #anchors or duplicates", () => {
    expect(urls.some((u) => u.includes("#"))).toBe(false);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("ranks the home page highest", () => {
    expect(entries[0].priority).toBe(1);
    for (const e of entries.slice(1)) expect(e.priority).toBeLessThan(1);
  });
});
