import { site } from "../../src/lib/site";
import { expect, fillCallRequest, mockContact, test } from "./fixtures";

for (const path of ["/contact", "/#contact"]) {
  test(`sends a call request from ${path}`, async ({ page }) => {
    const sent = await mockContact(page);
    await page.goto(path);
    await fillCallRequest(page);
    await page.getByRole("button", { name: "Book my call" }).click();

    await expect(page.locator("p[role=status]")).toContainText("We’ll be in touch within one business day");
    expect(sent).toEqual([
      {
        name: "Pat Owner",
        business: "Pat's Comics",
        email: "pat@example.com",
        phone: "618-555-0100",
        bestTime: "Mornings",
        message: "Pull lists live in a notebook.",
        website: "",
      },
    ]);
    await expect(page.getByLabel("Your name")).toHaveValue("");
    await expect(page.getByLabel(/eating your time/)).toHaveValue("");
  });
}

test("offers the phone and email when sending fails, and keeps what was typed", async ({ page }) => {
  await mockContact(page, 502);
  await page.goto("/contact");
  await fillCallRequest(page);
  await page.getByRole("button", { name: "Book my call" }).click();

  const status = page.locator("p[role=status]");
  await expect(status).toContainText("That didn’t go through");
  await expect(status).toContainText(site.phone);
  await expect(status).toContainText(site.email);
  await expect(page.getByLabel("Your name")).toHaveValue("Pat Owner");
  await expect(page.getByRole("button", { name: "Book my call" })).toBeEnabled();
});

test("shows the fallback when the network is down", async ({ page }) => {
  await page.goto("/contact"); // the fixture blocks /api/contact unless mocked
  await fillCallRequest(page);
  await page.getByRole("button", { name: "Book my call" }).click();
  await expect(page.locator("p[role=status]")).toContainText("That didn’t go through");
});

test("will not send with required fields missing or a bad email", async ({ page }) => {
  const sent = await mockContact(page);
  await page.goto("/contact");
  const submit = page.getByRole("button", { name: "Book my call" });

  await submit.click();
  await fillCallRequest(page);
  await page.getByLabel("Email").fill("not-an-email");
  await submit.click();
  await page.getByLabel("Email").fill("pat@example.com");
  await page.getByLabel("Phone", { exact: true }).fill("");
  await submit.click();

  expect(sent).toHaveLength(0);
  await expect(page.locator("p[role=status]")).toHaveCount(0);
});

test("business and best time are optional", async ({ page }) => {
  const sent = await mockContact(page);
  await page.goto("/contact");
  await page.getByLabel("Your name").fill("Pat");
  await page.getByLabel("Email").fill("pat@example.com");
  await page.getByLabel("Phone", { exact: true }).fill("555-0100");
  await page.getByLabel(/eating your time/).fill("Hello");
  await page.getByRole("button", { name: "Book my call" }).click();
  await expect(page.locator("p[role=status]")).toContainText("We’ll be in touch");
  expect(sent[0]).toMatchObject({ business: "", bestTime: "" });
});

test("cannot be submitted twice while sending", async ({ page }) => {
  const sent = await mockContact(page, 200, 800);
  await page.goto("/contact");
  await fillCallRequest(page);
  await page.getByRole("button", { name: "Book my call" }).click();

  const sending = page.getByRole("button", { name: "Sending…" });
  await expect(sending).toBeDisabled();
  await page.locator("form").evaluate((f: HTMLFormElement) => f.requestSubmit());
  await expect(page.locator("p[role=status]")).toContainText("We’ll be in touch");
  expect(sent).toHaveLength(1);
});

test("the spam trap is invisible to people", async ({ page }) => {
  await page.goto("/contact");
  const trap = page.locator('input[name="website"]');
  await expect(trap).toHaveCount(1);
  await expect(trap).toBeHidden();
  await expect(trap).toHaveAttribute("tabindex", "-1");
});

test("a note in the link pre-fills the message, capped at 600 characters", async ({ page }) => {
  await page.goto(`/contact?note=${"a".repeat(900)}`);
  await expect(page.getByLabel(/eating your time/)).toHaveValue("a".repeat(600));
});

test("explains what happens next", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Bring us the headache.");
  await expect(page.getByRole("main")).toContainText("We reply within one business day");
  await expect(page.getByRole("main").getByRole("link", { name: site.phone })).toHaveAttribute("href", site.phoneHref);
});
