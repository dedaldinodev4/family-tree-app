import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <CardTitle className="text-2xl">
            Árvore Genealógica da Família
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Organize os membros da sua família, visualize relações 
            e mantenha todos os contactos num só lugar.
          </p>

          <Button asChild className="w-full">
            <Link to="/members">Ver membros</Link>
          </Button>
        </CardContent>
      </Card>
    </div>

  );
}
