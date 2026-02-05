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
import { ParentSelectField } from "./ParentSelectField";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";



export function MemberForm() {

  const save = useSaveMember();

  const form = useForm<Member>({
    resolver: zodResolver(MemberSchema),
    defaultValues: {
      name: "",
      role: "",
      phone: "",
      photo: "",
      parentId: null,
    },
  });

  const {
    handleSubmit, register
  } = form;

  const onSubmit = (data: Member) => {

    save.mutate({ 
      ...data, 
      id: uuid(),
      birthDate: data.birthDate ? new Date(data.birthDate?.toISOString()) : undefined
    })
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

        <Button className="cursor-pointer" type="submit">Adicionar</Button>
      </form>
    </Form>
  );
}
