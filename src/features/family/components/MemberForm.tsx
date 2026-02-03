import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MemberSchema, type Member } from "../family.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { v4 as uuid } from "uuid";
import { useSaveMember } from "../family.hooks";
import { fileToBase64 } from "@/shared/utils/fileToBase64";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form
} from "@/components/ui/form";



export function MemberForm() {

  const save = useSaveMember();
  const form = useForm<Member>({
    resolver: zodResolver(MemberSchema),
    defaultValues: {
      name: "",
      role: "",
      phone: "",
      photo: "",
      email: "",
      parentId: null,

    },
  });

  const {
    handleSubmit, register, formState
  } = form;

  const onSubmit = (data: Member) => {
    save.mutate({ ...data, id: uuid() })
  }

  return (
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
        <Input placeholder="Ascedente" type="text" {...register("parentId")} />

        



        <Button className="cursor-pointer" type="submit">Adicionar</Button>
      </form>
    </Form>
  );
}
