import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { message: "ID é obrigatório" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { message: "Nota não encontrada ou erro ao buscar." },
        { status: 404 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar nota:", error);
    return NextResponse.json(
      { message: "Erro interno ao processar a requisição." },
      { status: 500 }
    );
  }
}
