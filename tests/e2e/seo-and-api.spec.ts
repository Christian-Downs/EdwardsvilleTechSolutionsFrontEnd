import { faqs, services, site } from "../../src/lib/site";
import { expect, test } from "./fixtures";

// These talk to the server directly, so one browser profile is enough.
test.beforeEach(({}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "not browser-dependent");
});

let n = 0;
const from = () => ({ "x-forwarded-for": `10.77.${Date.now() % 250}.${++n}` });

test("sitemap lists every page", async ({ request }) => {
  const res = await request.get("/sitemap.xml");
  expect(res.status()).toBe(200);
  const xml = await res.text();
  const urls = Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g)).map((m) => m[1]);
  expect(urls).toHaveLength(services.length + 3);
  for (const url of urls) {
    expect(url.startsWith(site.url)).toBe(true);
    const page = await request.get(url.replace(site.url, "") || "/");
    expect(page.status(), url).toBe(200);
  }
});

test("robots.txt allows crawling and points to the sitemap", async ({ request }) => {
  const text = await (await request.get("/robots.txt")).text();
  expect(text).toContain("Allow: /");
  expect(text).toContain(`Sitemap: ${site.url}/sitemap.xml`);
});

test("social preview image is generated", async ({ request }) => {
  const res = await request.get("/opengraph-image");
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("image/png");
  expect((await res.body()).length).toBeGreaterThan(5000);
});

test("home page carries business and FAQ data for search engines", async ({ page }) => {
  await page.goto("/");
  const blocks = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((t) => JSON.parse(t));

  const business = blocks.find((b) => b["@type"] === "LocalBusiness");
  expect(business).toMatchObject({ name: site.name, url: site.url, email: site.email });
  expect(business.address.addressLocality).toBe("Edwardsville");
  expect(business.hasOfferCatalog.itemListElement).toHaveLength(services.length);

  const faq = blocks.find((b) => b["@type"] === "FAQPage");
  expect(faq.mainEntity.map((q: { name: string }) => q.name)).toEqual(faqs.map((f) => f.question));

  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /Edwardsville Tech Solutions/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /opengraph-image/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", site.url);
});

test("service pages carry service data for search engines", async ({ page }) => {
  const s = services[0];
  await page.goto(`/services/${s.slug}`);
  const blocks = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((t) => JSON.parse(t));
  const service = blocks.find((b) => b["@type"] === "Service");
  expect(service.name).toBe(s.title);
  expect(service.hasOfferCatalog.itemListElement).toHaveLength(s.items.length);
});

test("analytics stays off until a measurement ID is set", async ({ page }) => {
  test.skip(!!process.env.NEXT_PUBLIC_GA_ID, "analytics is configured in this environment");
  const requests: string[] = [];
  page.on("request", (r) => requests.push(r.url()));
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  expect(requests.filter((u) => /googletagmanager|google-analytics/.test(u))).toEqual([]);
});

test("contact endpoint rejects incomplete requests", async ({ request }) => {
  const res = await request.post("/api/contact", { headers: from(), data: { name: "Pat", email: "nope", message: "Hi" } });
  expect(res.status()).toBe(400);
});

test("contact endpoint quietly drops spam-trap submissions", async ({ request }) => {
  const res = await request.post("/api/contact", {
    headers: from(),
    data: { name: "Bot", email: "bot@example.com", message: "Buy now", website: "http://spam.example" },
  });
  expect(res.status()).toBe(200);
});

test("contact endpoint only accepts POST", async ({ request }) => {
  expect((await request.get("/api/contact")).status()).toBe(405);
});

test("AI helper endpoint is off without a key", async ({ request }) => {
  test.skip(!!process.env.OPENAI_API_KEY, "a key is configured in this environment");
  expect(await (await request.get("/api/counter")).json()).toEqual({ enabled: false });
  const res = await request.post("/api/counter", { headers: from(), data: { messages: [{ role: "user", content: "Hi" }] } });
  expect(res.status()).toBe(503);
});
