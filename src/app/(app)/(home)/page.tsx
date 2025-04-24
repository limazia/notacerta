"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { useAnalyze } from "@/hooks/useAnalyze";

import { Button } from "@/components/ui/button";
import { DragDropZone } from "./_components/drag-drop-zone";
import { LoadingAnalysis } from "./_components/loading-analysis";

export default function Home() {
  const [isFinished, setIsFinished] = useState(false);

  const {
    register,
    errors,
    isSubmitting,
    isDirty,
    isValid,
    isPending,
    handleSubmit,
    handleAnalyze,
  } = useAnalyze();

  function handleFileLoaded(content: string) {
    register("xml").onChange({
      target: {
        name: "xml",
        value: content,
      },
    });
  }

  async function onAnalyze(data: { xml: string }) {
    await handleAnalyze(data);
    setIsFinished(true);
  }

  if (isSubmitting || isPending) {
    return <LoadingAnalysis isLoading={true} isFinished={isFinished} />;
  }

  return (
    <form onSubmit={handleSubmit(onAnalyze)} className="space-y-4">
      <div className="space-y-2">
        <DragDropZone
          onFileLoaded={handleFileLoaded}
          disabled={isSubmitting || isPending}
        />

        <p className="text-muted-foreground">
          Simplifique a análise de notas fiscais eletrônicas. Envie um arquivo
          .xml e receba um resumo explicativo instantaneamente.
        </p>

        {errors.xml && (
          <p className="text-sm text-red-500">
            {errors.xml?.message ||
              "Ocorreu um erro ao processar o arquivo. Tente novamente."}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full h-16"
        variant="default"
        disabled={isSubmitting || isPending || !isDirty || !isValid}
      >
        {isSubmitting || isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Analisando...
          </>
        ) : (
          "Analisar Nota"
        )}
      </Button>
    </form>
  );
}
