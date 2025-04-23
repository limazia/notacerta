import Link from "next/link";

export function Header() {
  return (
    <header className="flex flex-col items-start justify-start py-6">
      <Link href="/" className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 flex items-center justify-center bg-primary p-2 rounded-md">
          <span className="text-white select-none text-sm font-bold">XML</span>
        </div>

        <div className="flex flex-col space-y-1">
          <h1 className="text-3xl">
            <span className="font-normal">Nota</span>
            <span className="font-bold">Certa</span>
          </h1>

          <small className="text-muted-foreground">
            Explicador de Notas Fiscais com IA
          </small>
        </div>
      </Link>
    </header>
  );
}
