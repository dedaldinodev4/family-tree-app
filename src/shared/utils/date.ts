import { parse, isValid, format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function parseDate(value: string): Date | undefined {
  const parsed = parse(value, "dd/MM/yyyy", new Date(), {
    locale: ptBR,
  });

  return isValid(parsed) ? parsed : undefined;
}

export function formatDate(date?: Date) {
  return date
    ? format(date, "dd/MM/yyyy", { locale: ptBR })
    : "";
}
