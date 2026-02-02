import type { Member } from "./family.schema";

const KEY = "family_members";

export const getMembers = async (): Promise<Member[]> =>
  JSON.parse(localStorage.getItem(KEY) || "[]");

export const saveMembers = async (members: Member[]) =>
  localStorage.setItem(KEY, JSON.stringify(members));
