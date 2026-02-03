import type { Member } from "./family.schema";

const KEY = "family_members";

export const getMembers = async (): Promise<Member[]> =>
  JSON.parse(localStorage.getItem(KEY) || "[]");

export const saveMembers = async (members: Member[]) =>
  localStorage.setItem(KEY, JSON.stringify(members));

export const updateMemberStorage = async (data: Member) => {
  const stored = localStorage.getItem(KEY);
  if (!stored) return [];

  const members: Member[] = JSON.parse(stored);

  const newMembers = members.map((member) =>
    member.id === data.id ? { ...member, ...data } : member
  );

  localStorage.setItem(KEY, JSON.stringify(newMembers));

  return newMembers;
}

export const deleteMemberStorage = async (id: string) => {
  const stored = localStorage.getItem(KEY);
  if (!stored) return [];

  let members: Member[] = JSON.parse(stored);


  const hasChildren = members.some((m) => m.parentId === id);
  if (hasChildren) {
    throw new Error("Este membro tem descendentes. Remova-os primeiro.");
  }

  const newMembers = members.filter((member) => member.id !== id);
  localStorage.setItem(KEY, JSON.stringify(newMembers));

  return newMembers;
};


