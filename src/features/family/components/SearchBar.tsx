import { Input } from "@/components/ui/input";
import { useFamilyStore } from "../family.store";

export function SearchBar() {
  const { search, setSearch } = useFamilyStore();
  return (
    <Input
      placeholder="Pesquisar membro..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
