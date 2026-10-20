export const STARTING_ALLOCATION = { spend: 20, save: 20, give: 10 };
export type Allocation = typeof STARTING_ALLOCATION;
export function adjustAllocation(
  values: Allocation,
  key: keyof Allocation,
  delta: number,
): Allocation {
  const next = values[key] + delta;
  const total = values.spend + values.save + values.give;
  return next < 0 || total + delta > 50 ? values : { ...values, [key]: next };
}
