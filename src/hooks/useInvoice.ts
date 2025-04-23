import { useQuery } from "@tanstack/react-query";

import { getInvoice } from "@/http/get-invoice";

export function useInvoice(invoiceId: string) {
  const {
    data: invoice,
    isLoading: isLoadingInvoice,
    isFetching: isFetchingInvoice,
    isError: isErrorInvoice,
  } = useQuery({
    queryKey: ["invoice", invoiceId],
    queryFn: () => getInvoice(invoiceId),
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    invoice,
    isLoadingInvoice,
    isFetchingInvoice,
    isErrorInvoice,
  };
}
