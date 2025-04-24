interface PaymentMethod {
  label: string;
  description: string;
}

export const paymentMethods: Record<string, PaymentMethod> = {
  "01": {
    label: "Dinheiro",
    description: "",
  },
  "02": {
    label: "Cheque",
    description: "",
  },
  "03": {
    label: "Cartão de Crédito",
    description: "Requer informação da operadora",
  },
  "04": {
    label: "Cartão de Débito",
    description: "Requer informação da operadora",
  },
  "05": {
    label: "Crédito Loja",
    description: "Pagamento via crediário/próprio da loja",
  },
  "10": {
    label: "Vale Alimentação",
    description: "Refeições, supermercados etc.",
  },
  "11": {
    label: "Vale Refeição",
    description: "Restaurantes, lanchonetes etc.",
  },
  "12": {
    label: "Vale Presente",
    description: "Cartão presente, pré-pago etc.",
  },
  "13": {
    label: "Vale Combustível",
    description: "Postos de combustível",
  },
  "14": {
    label: "Duplicata Mercantil",
    description: "Pagamento a prazo por título",
  },
  "15": {
    label: "Boleto Bancário",
    description: "Emitido para pagamento via instituição financeira",
  },
  "16": {
    label: "Depósito Bancário",
    description: "Transferência via TED/DOC/PIX direto",
  },
  "17": {
    label: "Pagamento Instantâneo (PIX)",
    description: "Cada vez mais comum",
  },
  "18": {
    label: "Transferência bancária, Carteira Digital",
    description: "Inclui carteiras como PicPay, MercadoPago etc.",
  },
  "19": {
    label: "Programa de fidelidade",
    description: "Ex: pontos, milhas",
  },
  "20": {
    label: "Sem pagamento em espécie",
    description: "Troca de produto, consignação etc.",
  },
  "90": {
    label: "Sem pagamento",
    description: "Doação, bonificação, remessa etc.",
  },
  "99": {
    label: "Outros",
    description: "Quando nenhuma das opções anteriores se aplica",
  },
};