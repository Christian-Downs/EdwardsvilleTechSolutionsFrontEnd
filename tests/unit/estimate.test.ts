import { describe, expect, it } from "vitest";
import { estimate } from "@/lib/estimate";

describe("estimate", () => {
  it("works out the default example", () => {
    expect(estimate({ hours: 5, rate: 30, share: 60 })).toEqual({
      yearHours: 260,
      yearCost: 7800,
      savedHours: 156,
      savedMoney: 4680,
      workDays: 20,
    });
  });

  it("rounds saved hours to whole hours", () => {
    // 1 hr × 52 × 25% = 13 exactly; 3 hr × 52 × 35% = 54.6 → 55
    expect(estimate({ hours: 1, rate: 20, share: 25 }).savedHours).toBe(13);
    expect(estimate({ hours: 3, rate: 20, share: 35 }).savedHours).toBe(55);
  });

  it("prices savings from the rounded hours so the receipt adds up", () => {
    const r = estimate({ hours: 3, rate: 45, share: 35 });
    expect(r.savedMoney).toBe(r.savedHours * 45);
  });

  it("never saves more than the chore costs", () => {
    for (const hours of [1, 7, 40]) {
      for (const share of [20, 55, 90]) {
        const r = estimate({ hours, rate: 150, share });
        expect(r.savedHours).toBeLessThanOrEqual(r.yearHours);
        expect(r.savedMoney).toBeLessThanOrEqual(r.yearCost);
      }
    }
  });

  it("returns zeros for an empty input", () => {
    expect(estimate({ hours: 0, rate: 0, share: 0 })).toEqual({
      yearHours: 0,
      yearCost: 0,
      savedHours: 0,
      savedMoney: 0,
      workDays: 0,
    });
  });
});
