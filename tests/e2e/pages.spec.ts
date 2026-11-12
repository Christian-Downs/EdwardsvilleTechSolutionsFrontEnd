import { priceNote, services, site } from "../../src/lib/site";
import { expect, pages, test } from "./fixtures";

for (const s of services) {
  test.describe(`service page: ${s.slug}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/services/${s.slug}`);
    });

    test("shows the write-up and every priced item", async ({ page }) => {
      await expect(page).toHaveTitle(`${s.metaTitle} | ${site.name}`);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(s.title);
      const main = page.getByRole("main");
      await expect(main).toContainText(s.complaint);
      await expect(main).toContainText(s.intro);
      for (const item of s.items) {
        const row = main.locator("li", { has: page.getByRole("heading", { name: item.name, exact: true }) });
        await expect(row).toContainText(item.range);
        await expect(row).toContainText(item.plain);
        if (item.unit) await expect(row).toContainText(item.unit);
      }
      await expect(main).toContainText(priceNote);
      for (const fit of s.goodFor) await expect(main).toContainText(fit);
    });

    test("links to booking and to the other services", async ({ page }) => {
      const main = page.getByRole("main");
      await expect(main.getByRole("link", { name: "Book a call" })).toHaveCount(2);
      for (const other of services.filter((o) => o.slug !== s.slug)) {
        await expect(main.locator(`a[href="/services/${other.slug}"]`)).toHaveCount(1);
      }
      await expect(main.locator(`a[href="/services/${s.slug}"]`)).toHaveCount(0);
    });

    test("has its own search details", async ({ page }) => {
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", s.metaDescription);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${site.url}/services/${s.slug}`);
    });
  });
}

test("an unknown service shows a not-found page", async ({ page }) => {
  const response = await page.goto("/services/time-travel");
  expect(response?.status()).toBe(404);
});

test("about page tells the owner-led story with a photo", async ({ page }) => {
  await page.goto("/about");
  await expect(page).toHaveTitle(`About | ${site.name}`);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Small on purpose. Local on purpose.");
  await expect(page.getByRole("main")).toContainText("is owner-led");
  const photo = page.getByRole("img", { name: /owner/i });
  await expect(photo).toBeVisible();
  expect(await photo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  await page.getByRole("main").getByRole("link", { name: "Book a call" }).click();
  await expect(page).toHaveURL(/\/contact$/);
});

for (const path of pages) {
  test.describe(`basics on ${path}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(path);
    });

    test("fits the screen without sideways scrolling", async ({ page }) => {
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });

    test("has one main heading, a language and a description", async ({ page }) => {
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
      const description = await page.locator('meta[name="description"]').getAttribute("content");
      expect(description?.length).toBeGreaterThan(50);
    });

    test("every image has alt text and every form field has a label", async ({ page }) => {
      expect(await page.locator("img:not([alt])").count()).toBe(0);
      const unlabeled = await page.evaluate(() =>
        Array.from(document.querySelectorAll<HTMLInputElement>("input, select, textarea"))
          .filter((el) => !el.labels?.length && !el.getAttribute("aria-label"))
          .map((el) => el.name || el.id)
      );
      expect(unlabeled).toEqual([]);
    });

    test("every internal link leads somewhere", async ({ page, request }) => {
      const hrefs = await page.evaluate(() =>
        Array.from(new Set(Array.from(document.querySelectorAll("a[href^='/']")).map((a) => a.getAttribute("href")!)))
      );
      expect(hrefs.length).toBeGreaterThan(5);
      for (const href of hrefs) {
        const [route, anchor] = href.split("#");
        const res = await request.get(route || "/");
        expect(res.status(), href).toBe(200);
        if (anchor) expect(await res.text(), href).toContain(`id="${anchor}"`);
      }
    });
  });
}
