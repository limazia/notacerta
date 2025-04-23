import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página não encontrada",
};

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-[100vh] items-center justify-center space-y-8 text-center">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl uppercase">
          Página não encontrada
        </h1>
        <p className="max-w-[550px] mx-auto text-center text-gray-500 md:text-xl lg:text-base xl:text-xl">
          Talvez a página que você está tentando acessar tenha sido movida ou
          removida.
        </p>
      </div>

      <Link href="/">Página inicial</Link>
    </div>
  );
}