import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ptBR } from "date-fns/locale";

import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { filesToBase64 } from "@/shared/utils/fileToBase64";
import { momentSchema, type Moment } from "../moments.schema";
import { parseDate, formatDate } from "@/shared/utils/date";



export function MomentForm({ onSubmit }: { onSubmit: (data: Moment) => void }) {
  const form = useForm({
    resolver: zodResolver(momentSchema),
    defaultValues: {
      title: "",
      description: "",
      date: undefined,
      photos: [],
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <Input {...field} placeholder="Ex: Festa de Natal" />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <Input {...field} placeholder="Breve descrição do momento" />
            </FormItem>
          )}
        />

        {/* Data */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => {
            const [inputValue, setInputValue] = useState("");
            useEffect(() => {
              if (field.value) setInputValue(formatDate(field.value));
            }, [field.value]);

            return (
              <FormItem>
                <FormLabel>Data</FormLabel>
                <div className="flex gap-2">
                  <Input
                    placeholder="dd/mm/yyyy"
                    value={inputValue}
                    onChange={(e) => {
                      const value = e.target.value;
                      setInputValue(value);
                      const parsed = parseDate(value);
                      if (parsed) field.onChange(parsed);
                    }}
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">📅</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ?? undefined}
                        onSelect={(date) => {
                          field.onChange(date ?? null);
                          setInputValue(formatDate(date));
                        }}
                        locale={ptBR}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="photos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fotos</FormLabel>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={async (e) => {
                  if (!e.target.files) return;
                  const images = await filesToBase64(e.target.files);
                  field.onChange(images);
                }}
              />
              <div className="mt-3 flex gap-2 overflow-x-auto py-2">
                {field.value?.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    className="h-24 w-24 shrink-0 rounded-md object-cover border border-border"
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-4 w-full">
          Adicionar
        </Button>
      </form>
    </Form>
  );
}
