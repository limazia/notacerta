import { Header } from "@/components/header";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="max-w-4xl min-h-screen mx-auto">
      <Header />

      <div className="w-full py-12">{children}</div>
    </main>
  );
}
