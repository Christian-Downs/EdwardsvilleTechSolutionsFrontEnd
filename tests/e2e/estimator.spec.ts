import { expect, test } from "./fixtures";

test.beforeEach(async ({ page }) => {
  await page.goto("/#estimate");
});

const receipt = (page: import("@playwright/test").Page) => page.locator("#estimate .receipt");
const ringUp = (page: import("@playwright/test").Page) => page.getByRole("button", { name: "Ring it up" }).click();

test("starts with an empty receipt", async ({ page }) => {
  await expect(receipt(page)).toContainText("Your receipt prints here.");
  await expect(receipt(page).getByRole("link")).toHaveCount(0);
});

test("prints the default example", async ({ page }) => {
  await ringUp(page);
  const r = receipt(page);
  await expect(r).toContainText("Answering the same customer emails");
  await expect(r).toContainText("260 hr");
  await expect(r).toContainText("$7,800");
  await expect(r).toContainText("156 hr");
  await expect(r).toContainText("$4,680");
  await expect(r).toContainText("roughly 20 working days a year");
  await expect(r).toContainText("not a quote or a promise");
});

test("recalculates from the visitor's own numbers", async ({ page }) => {
  await page.getByLabel(/the chore/).fill("Invoicing");
  await page.getByLabel("Hours a week it eats").fill("10");
  await page.getByLabel("What an hour of that time is worth").fill("50");
  await page.getByLabel("How much of it is pure routine").fill("80");
  await expect(page.locator("#estimate form")).toContainText("10 hr");
  await expect(page.locator("#estimate form")).toContainText("$50");
  await expect(page.locator("#estimate form")).toContainText("80%");

  await ringUp(page);
  const r = receipt(page);
  await expect(r).toContainText("Invoicing");
  await expect(r).toContainText("520 hr"); // 10 × 52
  await expect(r).toContainText("$26,000"); // × $50
  await expect(r).toContainText("416 hr"); // 80%
  await expect(r).toContainText("$20,800");
  await expect(r).toContainText("roughly 52 working days");
});

test("the receipt only changes when rung up again", async ({ page }) => {
  await ringUp(page);
  await page.getByLabel("Hours a week it eats").fill("20");
  await expect(receipt(page)).toContainText("156 hr");
  await ringUp(page);
  await expect(receipt(page)).toContainText("624 hr");
});

test("copes with a blank chore name", async ({ page }) => {
  await page.getByLabel(/the chore/).fill("   ");
  await ringUp(page);
  await expect(receipt(page)).toContainText("Repetitive task");
});

test("says 'day' for a single working day", async ({ page }) => {
  await page.getByLabel("Hours a week it eats").fill("1");
  await page.getByLabel("How much of it is pure routine").fill("20");
  await ringUp(page);
  await expect(receipt(page)).toContainText("10 hr");
  await expect(receipt(page)).toContainText("roughly 1 working day a year");
});

test("carries the estimate into the call request", async ({ page }) => {
  await page.getByLabel(/the chore/).fill("Appointment reminders");
  await ringUp(page);
  await receipt(page).getByRole("link", { name: "Bring this to a call" }).click();
  await expect(page).toHaveURL(/\/contact\?note=/);
  await expect(page.getByLabel(/eating your time/)).toHaveValue(
    "Task: Appointment reminders. About 5 hrs/week. Estimator says roughly 156 hours a year could be handed off."
  );
});
