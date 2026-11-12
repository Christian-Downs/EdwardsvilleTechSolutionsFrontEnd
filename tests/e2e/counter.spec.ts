import { expect, mockCounter, test } from "./fixtures";

test("stays hidden when no API key is configured", async ({ page }) => {
  await mockCounter(page, { enabled: false });
  await page.goto("/");
  await expect(page.locator("#faq")).toBeVisible();
  await expect(page.locator("#counter")).toHaveCount(0);
});

test("stays hidden if the status check fails", async ({ page }) => {
  await page.route("**/api/counter", (route) => route.fulfill({ status: 500, body: "boom" }));
  await page.goto("/");
  await expect(page.locator("#faq")).toBeVisible();
  await expect(page.locator("#counter")).toHaveCount(0);
});

test.describe("when switched on", () => {
  test("appears with starter questions and a warning label", async ({ page }) => {
    await mockCounter(page);
    await page.goto("/");
    const counter = page.locator("#counter");
    await expect(counter.getByRole("heading", { name: "Ring the bell." })).toBeVisible();
    await expect(counter.getByRole("button", { name: /Where would AI actually help/ })).toBeVisible();
    await expect(counter).toContainText("AI helper · can be wrong");
    await expect(counter.getByRole("button", { name: "Ask" })).toBeDisabled();
  });

  test("a starter question gets an answer", async ({ page }) => {
    const sent = await mockCounter(page, { reply: () => "A new site typically runs $1,500 – $6,000." });
    await page.goto("/");
    const counter = page.locator("#counter");
    await counter.getByRole("button", { name: "What does a website cost?" }).click();

    await expect(counter).toContainText("A new site typically runs $1,500 – $6,000.");
    await expect(counter.getByRole("button", { name: /Where would AI actually help/ })).toHaveCount(0);
    expect(sent[0].messages).toEqual([{ role: "user", content: "What does a website cost?" }]);
  });

  test("keeps the whole conversation when asking a follow-up", async ({ page }) => {
    const sent = await mockCounter(page);
    await page.goto("/");
    const counter = page.locator("#counter");
    const input = counter.getByLabel("Your question");

    await input.fill("I run a comic shop");
    await counter.getByRole("button", { name: "Ask" }).click();
    await expect(counter).toContainText("Reply 1");
    await expect(input).toHaveValue("");

    await input.fill("What would it cost?");
    await input.press("Enter");
    await expect(counter).toContainText("Reply 2");

    expect(sent[1].messages).toEqual([
      { role: "user", content: "I run a comic shop" },
      { role: "assistant", content: "Reply 1" },
      { role: "user", content: "What would it cost?" },
    ]);
  });

  test("apologises and points to a call when the helper is down", async ({ page }) => {
    await mockCounter(page, { status: 502 });
    await page.goto("/");
    const counter = page.locator("#counter");
    await counter.getByLabel("Your question").fill("Hello?");
    await counter.getByRole("button", { name: "Ask" }).click();
    await expect(counter).toContainText("The counter helper is tied up right now");
    await expect(counter).toContainText("Hello?");
  });

  test("hands over to a person after eight questions", async ({ page }) => {
    const sent = await mockCounter(page);
    await page.goto("/");
    const counter = page.locator("#counter");
    const input = counter.getByLabel("Your question");
    for (let i = 1; i <= 8; i++) {
      await input.fill(`Question ${i}`);
      await input.press("Enter");
      await expect(counter).toContainText(`Reply ${i}`);
    }
    await expect(input).toHaveCount(0);
    await expect(counter).toContainText("That’s the limit for the demo");
    await counter.getByRole("link", { name: "Book a call" }).click();
    await expect(page).toHaveURL(/\/contact$/);
    expect(sent).toHaveLength(8);
  });

  test("cuts very long questions to 500 characters", async ({ page }) => {
    const sent = await mockCounter(page);
    await page.goto("/");
    const input = page.locator("#counter").getByLabel("Your question");
    await expect(input).toHaveAttribute("maxlength", "500");
    await input.evaluate((el: HTMLInputElement) => el.removeAttribute("maxlength"));
    await input.fill("x".repeat(900));
    await input.press("Enter");
    await expect(page.locator("#counter")).toContainText("Reply 1");
    expect(sent[0].messages[0].content).toHaveLength(500);
  });
});
