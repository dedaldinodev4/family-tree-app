import { create } from "zustand";

type Store = {
  search: string;
  setSearch: (v: string) => void;
};

export const useFamilyStore = create<Store>((set) => ({
  search: "",
  setSearch: (v) => set({ search: v }),
}));
