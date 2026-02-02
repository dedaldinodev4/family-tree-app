import type { Member } from "@/features/family/family.schema";

export const members: Member[] = [
  {
    id: "1", name: "Manuel Sebastião", role: "Patriarca", parentId: null
  },

  {
    id: "2", name: "Isabel Sebastião", role: "Mãe", parentId: "1"
  },
  {
    id: "3", name: "Germeias Sebastião", role: "Pai", parentId: "1"
  },
  {
    id: "4", name: "Anacleto Geremias", role: "Filha", parentId: "2"
  },
  {
    id: "5", name: "Maura Geremias", role: "Filho", parentId: "2"
  },
  {
    id: "6", name: "Manuel Domingos", role: "Filho da tia", parentId: "3"
  },
  {
    id: "7", name: "Azael Geremias", role: "Filho da irmã", parentId: "5"
  },
]