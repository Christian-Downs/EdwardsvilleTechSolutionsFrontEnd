import { services, site } from "../../src/lib/site";
import { expect, test } from "./fixtures";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("shows the headline and main call to action", async ({ page }) => {
  await expect(page).toHaveTitle(/Edwardsville Tech Solutions/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Tech help that works like a good repair shop.");
  await page.getByRole("main").getByRole("link", { name: "Book a call" }).first().click();
  await expect(page).toHaveURL(/\/contact$/);
});

test("the savings button jumps to the estimator", async ({ page }) => {
  await page.getByRole("link", { name: /See what it.d save you/ }).click();
  await expect(page).toHaveURL(/#estimate$/);
  await expect(page.getByRole("heading", { name: /chore costing you/ })).toBeInViewport();
});

test("lists every service as a ticket with its starting price", async ({ page }) => {
  const section = page.locator("#services");
  for (const s of services) {
    const ticket = section.locator(`a[href="/services/${s.slug}"]`);
    await expect(ticket).toContainText(s.title);
    await expect(ticket).toContainText(s.order);
    await expect(ticket).toContainText(s.from);
  }
  await expect(section.locator('a[href^="/services/"]')).toHaveCount(services.length);
});

test("a service ticket opens its page", async ({ page }) => {
  await page.locator('#services a[href="/services/custom-tools"]').click();
  await expect(page).toHaveURL(/\/services\/custom-tools$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Custom business tools");
});

test("shows the four house rules and four process steps", async ({ page }) => {
  for (const rule of ["Plain English", "Price range up front", "You get the owner", "A reply in one business day"]) {
    await expect(page.getByRole("heading", { name: rule })).toBeVisible();
  }
  await expect(page.locator("#process ol > li")).toHaveCount(4);
});

test("separates the real job from the examples", async ({ page }) => {
  const jobs = page.locator("#jobs");
  await expect(jobs).toContainText("Job file — local daycare");
  await expect(jobs).toContainText("Not client results");
  await expect(jobs.getByText("Example", { exact: true })).toHaveCount(3);
  await expect(jobs).toContainText("Comic book shop");
});

test("FAQ answers open and close", async ({ page }) => {
  const faq = page.locator("#faq details").first();
  const answer = faq.locator("p");
  await expect(answer).toBeHidden();
  await faq.locator("summary").click();
  await expect(answer).toBeVisible();
  await faq.locator("summary").click();
  await expect(answer).toBeHidden();
});

test("phone and email are tappable", async ({ page }) => {
  const contact = page.locator("#contact");
  await expect(contact.getByRole("link", { name: site.phone })).toHaveAttribute("href", site.phoneHref);
  await expect(contact.getByRole("link", { name: site.email })).toHaveAttribute("href", `mailto:${site.email}`);
});

test("does not show claims that were removed", async ({ page }) => {
  const text = (await page.locator("body").innerText()).toLowerCase();
  for (const claim of ["money-back", "project manager", "satisfaction guarantee", "testimonial"]) {
    expect(text).not.toContain(claim);
  }
});

test("the sample work order cycles to the next job", async ({ page }) => {
  const ticket = page.locator('[aria-label="Sample work order"]');
  await expect(ticket).toContainText("No. 0417");
  await expect(ticket).toContainText("No. 0418", { timeout: 10_000 });
});

test("the sample work order holds still for people who turn motion off", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  const ticket = page.locator('[aria-label="Sample work order"]');
  await page.waitForTimeout(6000);
  await expect(ticket).toContainText("No. 0417");
  await expect(ticket).toContainText("Written up");
});
