import { api } from "@/lib/axios";
import { Invoice as GetInvoiceResponse } from "@/interfaces/invoice";

export async function getInvoice(invoiceId: string) {
  const { data } = await api.get<GetInvoiceResponse>(`/invoice/${invoiceId}`);

  return data;
}
