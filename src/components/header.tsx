"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();
  const isInvoicePage = pathname?.startsWith("/invoice/");

  return (
    <header className="flex flex-col items-start justify-start py-6">
      <div className="w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-14 h-14 flex items-center justify-center bg-primary p-2 rounded-md">
            <span className="text-white select-none text-sm font-bold">
              XML
            </span>
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl">
              <span className="font-normal">Nota</span>
              <span className="font-bold">Certa</span>
            </h1>

            <small className="text-muted-foreground">
              Explicador de Notas Fiscais com IA
            </small>
          </div>
        </Link>

        {isInvoicePage && (
          <Link href="/">
            <Button variant="default">Nova Consulta</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
