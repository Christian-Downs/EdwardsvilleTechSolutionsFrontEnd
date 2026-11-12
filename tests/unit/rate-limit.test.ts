import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { allow, clientIp } from "@/lib/rate-limit";

describe("allow", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("lets requests through up to the limit, then blocks", () => {
    expect(allow("a", 2, 1000)).toBe(true);
    expect(allow("a", 2, 1000)).toBe(true);
    expect(allow("a", 2, 1000)).toBe(false);
  });

  it("tracks each key separately", () => {
    expect(allow("b", 1, 1000)).toBe(true);
    expect(allow("b", 1, 1000)).toBe(false);
    expect(allow("c", 1, 1000)).toBe(true);
  });

  it("opens up again once the window has passed", () => {
    expect(allow("d", 1, 1000)).toBe(true);
    expect(allow("d", 1, 1000)).toBe(false);
    vi.advanceTimersByTime(1001);
    expect(allow("d", 1, 1000)).toBe(true);
  });

  it("does not extend the block when blocked requests keep arriving", () => {
    expect(allow("e", 1, 1000)).toBe(true);
    vi.advanceTimersByTime(600);
    expect(allow("e", 1, 1000)).toBe(false);
    vi.advanceTimersByTime(500);
    expect(allow("e", 1, 1000)).toBe(true);
  });
});

describe("clientIp", () => {
  const req = (headers: Record<string, string>) => new Request("http://x", { headers });

  it("uses the first forwarded address", () => {
    expect(clientIp(req({ "x-forwarded-for": "1.2.3.4, 10.0.0.1" }))).toBe("1.2.3.4");
  });

  it("falls back when there is no header", () => {
    expect(clientIp(req({}))).toBe("unknown");
  });
});
