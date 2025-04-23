import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";

import { supabase } from "@/lib/supabase";
import { openai } from "@/lib/openai";
import { analyzeXMLSchema } from "@/schemas/analyze.schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = analyzeXMLSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Dados de entrada inválidos",
          errors: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { xml } = result.data;

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "",
    });

    const parsed = parser.parse(xml);

    // Verificação segura do caminho até infNFe
    const nfeProc = parsed?.nfeProc;
    const nfeTag = nfeProc?.NFe;
    const infNFe = nfeTag?.infNFe;

    if (!infNFe) {
      return NextResponse.json(
        { message: "Formato XML inválido ou nota fiscal não reconhecida" },
        { status: 400 }
      );
    }

    const invoiceId = infNFe.Id || "";

    const { data: existingInvoice, error: checkError } = await supabase
      .from("invoices")
      .select("id")
      .eq("id", invoiceId)
      .maybeSingle();

    if (checkError) {
      return NextResponse.json(
        { message: "Erro ao verificar duplicidade" },
        { status: 500 }
      );
    }

    if (existingInvoice) {
      return NextResponse.json(
        { message: "Nota fiscal já cadastrada" },
        { status: 409 }
      );
    }

    const jsonString = JSON.stringify(parsed);

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "Você é um especialista em notas fiscais eletrônicas brasileiras. Dado o conteúdo de uma NFe em JSON, gere um resumo simples, explicativo e direto ao ponto com os dados relevantes da compra, impostos, comprador, vendedor e se está tudo certo com a nota.",
        },
        { role: "user", content: jsonString },
      ],
    });

    const summary = completion.choices[0].message.content;

    const invoiceData = {
      id: invoiceId,

      invoice_number: infNFe.ide.nNF,
      date_of_issue: infNFe.ide.dhEmi?.split("T")[0] || "",
      nature_of_transaction: infNFe.ide.natOp,
      invoice_status: nfeProc.protNFe?.infProt?.xMotivo || "Desconhecido",

      issuing_company: infNFe.emit.xNome,
      issuing_address: `${infNFe.emit.enderEmit.xLgr}, ${infNFe.emit.enderEmit.nro}, ${infNFe.emit.enderEmit.xBairro}, ${infNFe.emit.enderEmit.xMun}, ${infNFe.emit.enderEmit.UF}, Brazil`,

      recipient_company: infNFe.dest?.xNome || "",
      recipient_address: infNFe.dest
        ? `${infNFe.dest.enderDest.xLgr}, ${infNFe.dest.enderDest.nro}, ${infNFe.dest.enderDest.xBairro}, ${infNFe.dest.enderDest.xMun}, ${infNFe.dest.enderDest.UF}, Brazil`
        : "",

      product_sold: infNFe.det?.[0]?.prod?.xProd || "",
      product_price: Number(infNFe.det?.[0]?.prod?.vProd || 0),
      discount: Number(infNFe.det?.[0]?.prod?.vDesc || 0),
      total_value: Number(infNFe.total?.ICMSTot?.vNF || 0),
      payment_method: infNFe.pag?.detPag?.tPag || "Not specified",

      technical_manager: infNFe.xContato || "",

      summary_ia: summary || "",
    };

    const { data, error } = await supabase
      .from("invoices")
      .insert(invoiceData)
      .select("id")
      .single();

    if (error || !data) {
      console.error("Erro ao salvar no Supabase:", error);
      return NextResponse.json(
        { message: "Erro ao salvar no banco" },
        { status: 500 }
      );
    }

    return NextResponse.json({ id: data.id }, { status: 200 });
  } catch (ex) {
    console.error(ex);
    return NextResponse.json(
      { message: "Erro ao processar a requisição" },
      { status: 500 }
    );
  }
}
