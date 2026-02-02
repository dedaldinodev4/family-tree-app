import type { Member } from "./family.schema";

export async function fetchMembers (): Promise<Member[]> {
  return [
    {
      id: "1",
      name: "Daniel Sebastião",
      parentId: "2"
    },
    {
      id: "1",
      name: "Adelia João",
      parentId: "2"
    }
  ]
}