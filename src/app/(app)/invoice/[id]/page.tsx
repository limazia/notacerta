"use client";

import "@/app/styles/github-markdown.css"

import { useEffect } from "react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

import { useInvoice } from "@/hooks/useInvoice";

import { InvoiceCard } from "./_components/invoice-card";
import { InvoiceCardSkeleton } from "./_components/invoice-card-skeleton";

export default function InvoiceView() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { invoice, isLoadingInvoice, isFetchingInvoice, isErrorInvoice } =
    useInvoice(id);

  useEffect(() => {
    if (!id || isErrorInvoice) {
      router.push("/");
      toast.error("Nota não encontrada");
    }
  }, [id, isErrorInvoice]);

  return (
    <>
      {(isLoadingInvoice && !invoice) || isFetchingInvoice || isErrorInvoice ? (
        <InvoiceCardSkeleton />
      ) : null}

      {invoice && Object.keys(invoice).length > 0 && (
        <InvoiceCard invoice={invoice} />
      )}
    </>
  );
}
