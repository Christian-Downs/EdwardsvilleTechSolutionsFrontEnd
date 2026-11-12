import { expect, test as base, type Page } from "@playwright/test";

/**
 * Every test fails if the page logs a console error or throws, and any call
 * that would send email or reach OpenAI is blocked unless the test mocks it.
 */
export const test = base.extend<{ failOnErrors: void }>({
  failOnErrors: [
    async ({ page }, use) => {
      const problems: string[] = [];
      page.on("pageerror", (e) => problems.push(`page error: ${e.message}`));
      page.on("console", (m) => {
        if (m.type() === "error" && !m.text().includes("Failed to load resource")) problems.push(`console: ${m.text()}`);
      });
      await page.route("**/api/contact", (route) => route.abort());
      await use();
      expect(problems, "browser errors").toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };

export async function mockContact(page: Page, status = 200, delayMs = 0) {
  const bodies: Record<string, string>[] = [];
  await page.route("**/api/contact", async (route) => {
    bodies.push(route.request().postDataJSON());
    if (delayMs) await new Promise((r) => setTimeout(r, delayMs));
    await route.fulfill({ status, json: status === 200 ? { ok: true } : { error: "Could not send" } });
  });
  return bodies;
}

type CounterOptions = { enabled?: boolean; reply?: (n: number) => string; status?: number };

export async function mockCounter(page: Page, { enabled = true, reply = (n) => `Reply ${n}`, status = 200 }: CounterOptions = {}) {
  const bodies: { messages: { role: string; content: string }[] }[] = [];
  await page.route("**/api/counter", async (route) => {
    if (route.request().method() === "GET") return route.fulfill({ json: { enabled } });
    bodies.push(route.request().postDataJSON());
    if (status !== 200) return route.fulfill({ status, json: { error: "Unavailable" } });
    await route.fulfill({ json: { reply: reply(bodies.length) } });
  });
  return bodies;
}

export async function fillCallRequest(page: Page) {
  await page.getByLabel("Your name").fill("Pat Owner");
  await page.getByLabel("Business").fill("Pat's Comics");
  await page.getByLabel("Email").fill("pat@example.com");
  await page.getByLabel("Phone", { exact: true }).fill("618-555-0100");
  await page.getByLabel("Best time to call").selectOption("Mornings");
  await page.getByLabel(/eating your time/).fill("Pull lists live in a notebook.");
}

export const pages = ["/", "/about", "/contact", "/services/ai-helpers", "/services/websites"];
