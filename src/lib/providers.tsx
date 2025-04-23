"use client";

import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/lib/react-query";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={0}>{children}</TooltipProvider>

      <Toaster
        position="top-right"
        expand
        closeButton={false}
        toastOptions={{
          duration: 5000,
        }}
      />
    </QueryClientProvider>
  );
}
