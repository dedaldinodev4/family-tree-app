import type { Moment } from "../moments.schema";

export function groupMomentsByYear(moments: Moment[]) {
  return moments.reduce<Record<string, Moment[]>>((acc, moment) => {
    const year = new Date(moment.date).getFullYear();
    acc[year] = acc[year] || [];
    acc[year].push(moment);
    return acc;
  }, {});
}
