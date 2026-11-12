import { services } from "../../src/lib/site";
import { expect, test } from "./fixtures";

test("header links go to the right places", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop header");
  await page.goto("/about");
  const nav = page.getByRole("navigation", { name: "Main" });

  await nav.getByRole("link", { name: "Services" }).click();
  await expect(page).toHaveURL(/\/#services$/);
  await nav.getByRole("link", { name: "Savings estimate" }).click();
  await expect(page).toHaveURL(/\/#estimate$/);
  await nav.getByRole("link", { name: "Job files" }).click();
  await expect(page).toHaveURL(/\/#jobs$/);
  await nav.getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/\/about$/);
  await nav.getByRole("link", { name: "Book a call" }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await nav.getByRole("link", { name: /Edwardsville Tech/ }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("phone menu opens, navigates and closes", async ({ page, isMobile }) => {
  test.skip(!isMobile, "phone header");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Menu" });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#mobile-menu")).toHaveCount(0);

  await toggle.click();
  const menu = page.locator("#mobile-menu");
  await expect(menu).toBeVisible();
  await expect(page.getByRole("button", { name: "Close" })).toHaveAttribute("aria-expanded", "true");
  for (const name of ["Services", "Savings estimate", "Job files", "About", "Book a call"]) {
    await expect(menu.getByRole("link", { name })).toBeVisible();
  }

  await menu.getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.locator("#mobile-menu")).toHaveCount(0);

  await page.getByRole("button", { name: "Menu" }).click();
  await page.getByRole("button", { name: "Close" }).click();
  await expect(page.locator("#mobile-menu")).toHaveCount(0);
});

test("footer links to every service, about and contact", async ({ page }) => {
  await page.goto("/");
  const footer = page.getByRole("contentinfo");
  for (const s of services) {
    await expect(footer.getByRole("link", { name: s.title })).toHaveAttribute("href", `/services/${s.slug}`);
  }
  await footer.getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("contentinfo")).toContainText(`© ${new Date().getFullYear()}`);
});

test("skip link is the first stop for keyboard users", async ({ page, isMobile }) => {
  test.skip(isMobile, "keyboard navigation");
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toHaveAttribute("href", "#main");
});
