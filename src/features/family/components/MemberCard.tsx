import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "@tanstack/react-router";

import { Card, CardContent } from "@/components/ui/card";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

import { Pencil, Trash2, X, Phone, Cake, Briefcase } from "lucide-react";

import { MemberSchema, type Member } from "../family.schema";
import { useDeleteMember, useUpdateMember } from "../family.hooks";
import { fileToBase64 } from "@/shared/utils/fileToBase64";
import { ParentSelectField } from "./ParentSelectField";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { formatDate } from "@/shared/utils/date";

export function MemberCard({ member }: { member: Member }) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const deleteMember = useDeleteMember()
  const updateMember = useUpdateMember();

  const form = useForm<Member>({
    resolver: zodResolver(MemberSchema),
    defaultValues: {
      ...member,
      birthDate: member.birthDate ? 
      new Date(member.birthDate) : undefined
    },
  });

  const {
    handleSubmit, register
  } = form;

  const onSubmit = (data: Member) => {
    updateMember.mutate(
      {
        ...data,
        birthDate: data.birthDate ? new Date(data.birthDate) : undefined
      }
    );
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

          <CardContent className="space-y-3">
            {/* Phone */}
            {member.phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{member.phone}</span>
              </div>
            )}

            {/* Birthday */}
            {member.birthDate && (
              <div className="flex items-center gap-2 text-sm">
                <Cake className="h-4 w-4 text-muted-foreground" />
                <span>{formatDate(new Date(member.birthDate))}</span>
              </div>
            )}
          </CardContent>

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
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="justify-start text-left font-normal"
                          >
                            {field.value
                              ? format(field.value, "dd/MM/yyyy", { locale: ptBR })
                              : "Data de Nascimento"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          locale={ptBR}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Input placeholder="Papel/Função" type="text" {...register("role")} />
              <Input placeholder="Telefone" type="text" {...register("phone")} />
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
