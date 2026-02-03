import { useRouter } from "@tanstack/react-router";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { Pencil, Trash2, X } from "lucide-react";

import type { Member } from "../family.schema";

export function MemberCard({ member }: { member: Member }) {
  const router = useRouter();
  
  return (
    <Card className="relative max-w-sm mx-auto p-4">
      <div className="absolute top-2 right-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.navigate({ to: "/members" })}
        >
          <X className="w-4 h-4 cursor-pointer" />
        </Button>
      </div>
      <div className="flex flex-col items-center gap-3">

        <Avatar className="w-24 h-24 border-2 border-gray-200 shadow-md rounded-full">
          <AvatarImage src={member.photo} />
          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="text-center">
          <h2 className="text-xl font-bold">{member.name}</h2>
          <p className="text-muted-foreground">{member.role}</p>
        </div>

        <Separator />

        <div className="text-sm space-y-1 font-bold">
          <p>
            Email: <span className="font-normal">{member.email}</span>
          </p>
          <p>
            Telefone: <span className="font-normal">{member.phone}</span>
          </p>
          <p>
            ID: <span className="font-normal">{member.id}</span>
          </p>
        </div>

        <div className="flex gap-2 mt-3">
          <Button
            variant="ghost"
            size="icon"
            className="flex-1 cursor-pointer"
          >
            <Pencil className="w-3 h-3" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="flex-1 cursor-pointer"
          >
            <Trash2 className="w-3 h-3 text-destructive" />
          </Button>
        </div>
      </div>
    </Card>

  );
}
