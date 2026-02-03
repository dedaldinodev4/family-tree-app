import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MemberSchema, type Member } from "../family.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { v4 as uuid } from "uuid";
import { useSaveMember } from "../family.hooks";
import { toBase64 } from "@/shared/utils/toBase64";
import { useQueryClient } from "@tanstack/react-query";



export function MemberForm() {
  const queryClient = useQueryClient();

  const save = useSaveMember();
  const {
    handleSubmit,
    register,
    formState
  } = useForm<Member>({
    resolver: zodResolver(MemberSchema),
    defaultValues: { 
      name: "",
      role: "",
      phone: "",
      photo: "",
      parentId: null,

    },
  });

  const onSubmit = (data: Member) => {
    save.mutate({ ...data, id: uuid() })
  } 

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3"
    >
      <Input placeholder="Nome" type="text" {...register("name")} />
      <Input placeholder="Telefone" type="text" {...register("phone")} />
      <Input placeholder="Papel" type="text" {...register("role")} />
      <Input placeholder="Ascedente" type="text" {...register("parentId")} />

      <Input
        type="file"
        accept="image/*"
      />

      <Button className="cursor-pointer" type="submit">Adicionar</Button>
    </form>
  );
}
