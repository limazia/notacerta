import MarkdownComponent from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import {
  Info,
  Calendar,
  Building,
  Truck,
  DollarSign,
  Sparkle,
  ShoppingBag,
} from "lucide-react";

import { Invoice } from "@/interfaces/invoice";
import { formatDate } from "@/utils/format-date";
import { paymentMethods } from "./_types/payment-methods";
import { getStatusInfo } from "./_types/status-type";
import { formatPrice } from "@/utils/format-price";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface InvoiceCardProps {
  invoice: Invoice;
}

export function InvoiceCard({ invoice }: InvoiceCardProps) {
  const statusInfo = getStatusInfo(invoice.invoice_status);

  return (
    <div className="space-y-6">
      <Card className="shadow-lg p-0">
        <CardHeader className="bg-gray-100 border-b py-4 px-6 gap-0">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-1 text-xl">
              Nota Fiscal{" "}
              <Badge variant="outline" className="ml-2 font-mono">
                #{invoice.invoice_number || "—"}
              </Badge>
            </CardTitle>
            <Badge className={statusInfo.color}>
              <statusInfo.icon className="h-3.5 w-3.5 mr-1" />
              {statusInfo.label}
            </Badge>
          </div>

          <CardDescription />
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {/* Data de Emissão */}
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">
                    Data de Emissão
                  </h3>
                  <p className="font-semibold">
                    {invoice.date_of_issue
                      ? formatDate(invoice.date_of_issue)
                      : "Não informada"}
                  </p>
                </div>
              </div>

              {/* Natureza da Operação */}
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Info className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">
                    Natureza da Operação
                  </h3>
                  {invoice.nature_of_transaction ? (
                    <p className="font-semibold">
                      {invoice.nature_of_transaction}
                    </p>
                  ) : (
                    <p className="text-muted-foreground">Não especificada</p>
                  )}
                </div>
              </div>

              {/* Empresa Emitente */}
              <div className="flex items-start gap-3">
                <div className="bg-amber-100 p-2 rounded-full">
                  <Building className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">
                    Empresa Emitente
                  </h3>
                  <p className="font-semibold">
                    {invoice.issuing_company || "Não informada"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {invoice.issuing_address || "Endereço não disponível"}
                  </p>
                </div>
              </div>
            </div>

            {/* Coluna 2 */}
            <div className="space-y-4">
              {/* Empresa Destinatária */}
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Truck className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">
                    Empresa Destinatária
                  </h3>
                  <p className="font-semibold">
                    {invoice.recipient_company || "Não informada"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {invoice.recipient_address || "Endereço não disponível"}
                  </p>
                </div>
              </div>

              {/* Responsável Técnico */}
              <div className="flex items-start gap-3">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <Info className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">
                    Responsável Técnico
                  </h3>
                  <p className="font-semibold">
                    {invoice.technical_manager || "Não informado"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-6">
            {/* Produto */}
            <div>
              <h3 className="font-medium mb-4 flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2 text-green-600" />
                Detalhes do Produto
              </h3>
              <div className="bg-gray-100 p-4 rounded-md border">
                <p className="font-medium">
                  {invoice.product_sold || "Produto não especificado"}
                </p>
              </div>
            </div>

            {/* Financeiro */}
            <div>
              <h3 className="font-medium mb-4 flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                Detalhes Financeiros
              </h3>
              <div className="bg-gray-50 p-4 rounded-md border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Valor do Produto
                    </p>
                    <p className="font-semibold">
                      {invoice.product_price
                        ? formatPrice(invoice.product_price)
                        : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Desconto</p>
                    <p className="font-semibold text-red-500">
                      {invoice.discount ? formatPrice(invoice.discount) : "—"}
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-md border border-green-200">
                    <p className="text-sm text-muted-foreground">Valor Total</p>
                    <p className="font-bold text-lg text-green-600">
                      {invoice.total_value
                        ? formatPrice(invoice.total_value)
                        : "—"}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    Forma de Pagamento
                  </p>

                  <span>
                    {paymentMethods[invoice.payment_method]?.label ||
                      "Não especificada"}{" "}
                    {paymentMethods[invoice.payment_method]?.description && (
                      <>
                        (
                        {paymentMethods[invoice.payment_method]?.description ||
                          "-"}
                        )
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Resumo IA */}
            {invoice.summary_ia && (
              <div>
                <h3 className="font-medium mb-4 flex items-center">
                  <Sparkle className="h-5 w-5 mr-2 text-green-600" />
                  Resumo IA
                </h3>
                <div className="bg-gray-50 p-4 rounded-md border">
                  <div className="markdown-body text-sm text-muted-foreground">
                    <MarkdownComponent
                      rehypePlugins={[rehypeHighlight, remarkGfm]}
                    >
                      {invoice.summary_ia}
                    </MarkdownComponent>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <small className="text-muted-foreground">
          *Os registros de XML têm uma duração de 1 semana no banco de dados.
          Após esse período, os registros são automaticamente excluídos.
        </small>
      </div>
    </div>
  );
}
