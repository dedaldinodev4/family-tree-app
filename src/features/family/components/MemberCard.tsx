import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "@tanstack/react-router";

import { Card } from "@/components/ui/card";
import { 
  Avatar, 
  AvatarImage, 
  AvatarFallback 
} from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

import { Pencil, Trash2, X } from "lucide-react";

import { MemberSchema, type Member } from "../family.schema";
import { useDeleteMember, useUpdateMember } from "../family.hooks";
import { fileToBase64 } from "@/shared/utils/fileToBase64";
import { ParentSelectField } from "./ParentSelectField";

export function MemberCard({ member }: { member: Member }) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const deleteMember = useDeleteMember()
  const updateMember = useUpdateMember();

  const form = useForm<Member>({
    resolver: zodResolver(MemberSchema),
    defaultValues: member,
  });

  const {
    handleSubmit, register
  } = form;

  const onSubmit = (data: Member) => {
    updateMember.mutate(data);
    setEditOpen(false);
  }

  const deleteMemberClick = (id: string) => {
    deleteMember.mutate(id)
  }

  return (
    <>
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
              onClick={() => setEditOpen(true)}
            >
              <Pencil className="w-3 h-3" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="flex-1 cursor-pointer"
              onClick={() => setDeleteOpen(true)}
            >
              <Trash2 className="w-3 h-3 text-destructive" />
            </Button>
          </div>
        </div>
      </Card>
      {/* Edit Modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Membro</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-3"
            >
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Foto</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          const base64 = await fileToBase64(file);

                          form.setValue("photo", base64, {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
                        }}
                      />
                    </FormControl>

                    {field.value && (
                      <img
                        src={field.value}
                        alt="Preview"
                        className="mt-2 h-14 w-14 rounded-full object-cover"
                      />
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Input placeholder="Nome" type="text" {...register("name")} />
              <Input placeholder="Email" type="text" {...register("email")} />
              <Input placeholder="Telefone" type="text" {...register("phone")} />
              <Input placeholder="Papel/Função" type="text" {...register("role")} />
              <ParentSelectField />

              <Button className="cursor-pointer" type="submit">Salvar</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* AlertDialog Delete */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Deseja apagar o membro?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive"
              onClick={() => deleteMemberClick(`${member.id}`)}
            >
              Apagar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </>




  );
}
