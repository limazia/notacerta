import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";

import { analyzeXML } from "@/http/analyze-xml";
import {
  type AnalyzeXMLSchema,
  analyzeXMLSchema,
} from "@/schemas/analyze.schema";

export function useAnalyze() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<AnalyzeXMLSchema>({
    resolver: zodResolver(analyzeXMLSchema),
    mode: "onChange",
  });

  const {
    data,
    isPending,
    mutateAsync: analyzeXMLFn,
  } = useMutation({
    mutationFn: analyzeXML,
    onSuccess(data) {
      if (data?.id) {
        router.push(`invoice/${data?.id}`);
      } else {
        router.push("/");
      }
    },
    onError(error: AxiosError<{ message: string }>) {
      const message = error?.response?.data?.message || "Erro desconhecido";

      toast.error(message);
    },
  });

  async function handleAnalyze(data: AnalyzeXMLSchema) {
    toast.promise(analyzeXMLFn(data), {
      loading: "Analisando XML...",
      success: "Análise concluída com sucesso!",
      //error: "Não foi possível encontrar dados válidos no XML.",
    });
  }

  return {
    register,
    reset,
    errors,
    isSubmitting,
    isDirty,
    isValid,
    isPending,
    data,
    handleSubmit,
    handleAnalyze,
  };
}
