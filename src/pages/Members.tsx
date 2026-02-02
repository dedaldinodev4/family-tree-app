import { useMembers } from "@/features/family/family.hooks";
import { useFamilyStore } from "@/features/family/family.store";
import { MemberForm } from "@/features/family/components/MemberForm";
import { FamilyTree } from "@/features/family/components/FamilyTree";
import { SearchBar } from "@/features/family/components/SearchBar";
import { Card } from "@/components/ui/card";


export default function Members() {
  const { data = [], isLoading } = useMembers();

  const search = useFamilyStore((s) => s.search);

  const filtered = data.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return <p className="p-6">Carregando membros...</p>
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Membros da Família</h1>
        <SearchBar />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-4">
          <h2 className="font-semibold mb-3">Adicionar membro</h2>
          <MemberForm />
        </Card>

        <div className="lg:col-span-2">
          <FamilyTree members={filtered} />
        </div>
      </div>
    </div>
  );
}
