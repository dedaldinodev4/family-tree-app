import { useParams, Link } from "@tanstack/react-router";
import { useMembers } from "@/features/family/family.hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MemberCard } from "@/features/family/components/MemberCard";

export default function MemberDetails() {
  const { memberId } = useParams({ strict: false });
  const { data = [] } = useMembers();

  const member = data.find((m) => m.id === memberId);

  if (!member) {
    return (
      <div className="p-6">
        <p>Membro não encontrado.</p>
        <Button asChild className="mt-4">
          <Link to="/members">Voltar</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <MemberCard member={member} />
    </div>
  );
}
