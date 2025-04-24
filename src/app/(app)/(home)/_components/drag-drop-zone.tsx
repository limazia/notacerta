"use client";

import { useState, useRef, type DragEvent } from "react";
import { toast } from "sonner";
import { UploadCloudIcon } from "lucide-react";

import { cn } from "@/utils/cn";

import { Input } from "@/components/ui/input";

interface DragDropZoneProps {
  onFileLoaded: (content: string) => void;
  disabled: boolean;
}

export function DragDropZone({ onFileLoaded, disabled }: DragDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  }

  function processFile(file: File) {
    if (file && (file.type === "text/xml" || file.name.endsWith(".xml"))) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onFileLoaded(event.target.result.toString());
        }
      };
      reader.readAsText(file);
    } else {
      toast.error("Por favor, envie um arquivo .xml válido.");
    }
  }

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-md p-8 text-center cursor-pointer transition-colors",
        isDragging
          ? "border-primary bg-primary/5"
          : fileName
          ? "border-green-500 bg-green-50/50"
          : "border-muted-foreground/25 hover:border-muted-foreground/50",
        disabled && "cursor-not-allowed opacity-50"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <Input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".xml"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            processFile(file);
          }
        }}
        disabled={disabled}
      />

      <div className="flex flex-col items-center justify-center gap-4">
        {fileName ? (
          <>
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <UploadCloudIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-lg">{fileName}</p>
              <p className="text-sm text-muted-foreground">
                Arquivo carregado com sucesso
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <UploadCloudIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium">
                Arraste e solte seu arquivo XML aqui
              </p>
              <p className="text-sm text-muted-foreground">
                ou clique para selecionar um arquivo
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
