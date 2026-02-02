import { useParams, Link } from "@tanstack/react-router";
import { useMembers } from "@/features/family/family.hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

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
      <Card>
        <CardHeader className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            {member.photo && <AvatarImage src={member.photo} />}
            <AvatarFallback>
              {member.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <CardTitle>{member.name}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          {member.phone && <p>📞 {member.phone}</p>}
          {member.role && <p>✉️ {member.role}</p>}

          <Button variant="outline" asChild className="mt-4">
            <Link to="/members">Voltar à lista</Link>
          </Button>
        
        </CardContent>
      </Card>
    </div>
  );
}
