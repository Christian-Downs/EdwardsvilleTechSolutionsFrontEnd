export type EstimateInput = { hours: number; rate: number; share: number };

/** Yearly cost of a weekly chore, and how much of it is routine enough to hand off. */
export function estimate({ hours, rate, share }: EstimateInput) {
  const yearHours = hours * 52;
  const yearCost = yearHours * rate;
  const savedHours = Math.round(yearHours * (share / 100));
  const savedMoney = savedHours * rate;
  const workDays = Math.round(savedHours / 8);
  return { yearHours, yearCost, savedHours, savedMoney, workDays };
}
