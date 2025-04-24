import { format, parseISO, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDate(date: string) {
  const parseDate = parseISO(date);

  return isValid(parseDate)
    ? format(parseDate, "dd/MM/yyyy", {
        locale: ptBR,
      })
    : "Data inválida";
}
