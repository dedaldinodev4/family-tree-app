// features/moments/moments.service.ts
import type { Moment } from "./moments.schema";

const KEY = "family-moments";

export function getMoments(): Moment[] {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function saveMoment(moment: Moment) {
  const moments = getMoments();
  localStorage.setItem(KEY, JSON.stringify([...moments, moment]));
}
