import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const sendMail = vi.fn();
const createTransport = vi.fn((_options: unknown) => ({ sendMail }));
vi.mock("nodemailer", () => ({ default: { createTransport: (o: unknown) => createTransport(o) } }));

import { POST } from "@/app/api/contact/route";

let ipCounter = 0;
/** Each test posts from its own address so the rate limiter doesn't interfere. */
function post(body: unknown, ip = `10.1.0.${++ipCounter}`) {
  return POST(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": ip },
      body: typeof body === "string" ? body : JSON.stringify(body),
    })
  );
}

const valid = {
  name: "Pat Owner",
  business: "Pat's Comics",
  email: "pat@example.com",
  phone: "618-555-0100",
  bestTime: "Mornings",
  message: "Pull lists are a mess.",
  website: "",
};

const fetchMock = vi.fn();

beforeEach(() => {
  sendMail.mockReset().mockResolvedValue({});
  createTransport.mockClear();
  fetchMock.mockReset().mockResolvedValue(new Response("ok", { status: 200 }));
  vi.stubGlobal("fetch", fetchMock);
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.stubEnv("SMTP_USER", "");
  vi.stubEnv("SMTP_PASS", "");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("validation", () => {
  it("rejects a body that is not JSON", async () => {
    expect((await post("not json")).status).toBe(400);
  });

  it.each([
    ["no name", { ...valid, name: "  " }],
    ["no message", { ...valid, message: "" }],
    ["no email", { ...valid, email: "" }],
    ["a malformed email", { ...valid, email: "pat@nowhere" }],
    ["a non-string name", { ...valid, name: 42 }],
  ])("rejects %s", async (_label, body) => {
    const res = await post(body);
    expect(res.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("accepts a request without the optional fields", async () => {
    const res = await post({ name: "Pat", email: "pat@example.com", message: "Hello" });
    expect(res.status).toBe(200);
  });
});

describe("spam protection", () => {
  it("pretends to succeed but sends nothing when the hidden field is filled in", async () => {
    const res = await post({ ...valid, website: "http://spam.example" });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("blocks the sixth request from one address", async () => {
    for (let i = 0; i < 5; i++) expect((await post(valid, "10.9.9.9")).status).toBe(200);
    expect((await post(valid, "10.9.9.9")).status).toBe(429);
    expect(fetchMock).toHaveBeenCalledTimes(5);
  });
});

describe("without SMTP settings", () => {
  it("passes the request to the previous mailer in the shape it expects", async () => {
    const res = await post(valid);
    expect(res.status).toBe(200);
    expect(sendMail).not.toHaveBeenCalled();

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://cs-tutoring-mfiz.vercel.app/api/emailer");
    expect(init.method).toBe("POST");
    const inner = JSON.parse(JSON.parse(init.body).body);
    expect(inner).toMatchObject({ name: "Pat Owner", email: "pat@example.com" });
    expect(inner.subject).toBe("Call request: Pat Owner (Pat's Comics)");
    expect(inner.message).toContain("Phone: 618-555-0100");
    expect(inner.message).toContain("Best time to call: Mornings");
    expect(inner.message).toContain("Pull lists are a mess.");
  });

  it("reports a failure when the previous mailer is down", async () => {
    fetchMock.mockResolvedValue(new Response("nope", { status: 500 }));
    expect((await post(valid)).status).toBe(502);
  });

  it("reports a failure when the network call throws", async () => {
    fetchMock.mockRejectedValue(new Error("offline"));
    expect((await post(valid)).status).toBe(502);
  });
});

describe("with SMTP settings", () => {
  beforeEach(() => {
    vi.stubEnv("SMTP_USER", "shop@example.com");
    vi.stubEnv("SMTP_PASS", "app-password");
  });

  it("sends the email itself and leaves the previous mailer alone", async () => {
    const res = await post(valid);
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(createTransport).toHaveBeenCalledWith(
      expect.objectContaining({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user: "shop@example.com", pass: "app-password" },
      })
    );
    const mail = sendMail.mock.calls[0][0];
    expect(mail.to).toBe("shop@example.com");
    expect(mail.replyTo).toBe("pat@example.com");
    expect(mail.subject).toBe("Call request: Pat Owner (Pat's Comics)");
    expect(mail.text).toContain("Pull lists are a mess.");
  });

  it("delivers to CONTACT_TO and honours a custom host and port", async () => {
    vi.stubEnv("CONTACT_TO", "leads@example.com");
    vi.stubEnv("SMTP_HOST", "smtp.example.com");
    vi.stubEnv("SMTP_PORT", "587");
    await post(valid);
    expect(createTransport).toHaveBeenCalledWith(
      expect.objectContaining({ host: "smtp.example.com", port: 587, secure: false })
    );
    expect(sendMail.mock.calls[0][0].to).toBe("leads@example.com");
  });

  it("keeps line breaks out of the subject line", async () => {
    await post({ ...valid, name: "Pat\r\nBcc: someone@evil.example", business: "" });
    expect(sendMail.mock.calls[0][0].subject).not.toMatch(/[\r\n]/);
  });

  it("trims over-long fields", async () => {
    await post({ ...valid, name: "N".repeat(500), message: "M".repeat(5000) });
    const mail = sendMail.mock.calls[0][0];
    expect(mail.subject.length).toBeLessThan(320);
    expect(mail.text.match(/M{5,}/)![0]).toHaveLength(2000);
  });

  it("fills in placeholders for blank optional fields", async () => {
    await post({ ...valid, business: "", phone: "", bestTime: "" });
    const { text, subject } = sendMail.mock.calls[0][0];
    expect(subject).toBe("Call request: Pat Owner");
    expect(text).toContain("Business: -");
    expect(text).toContain("Phone: -");
    expect(text).toContain("Best time to call: Any time, Mon-Fri");
  });

  it("reports a failure when the mail server rejects the message", async () => {
    sendMail.mockRejectedValue(new Error("auth failed"));
    expect((await post(valid)).status).toBe(502);
  });
});
