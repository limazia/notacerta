import { CheckCircle, XCircle, AlertCircle, HelpCircle } from "lucide-react";

export function getStatusInfo(status: string | undefined) {
  const normalized = status?.toLowerCase();

  switch (normalized) {
    case "autorizado o uso da nf-e":
      return {
        label: "Autorizada",
        color: "bg-green-500 hover:bg-green-600",
        icon: CheckCircle,
      };
    case "cancelamento autorizado":
      return {
        label: "Cancelada",
        color: "bg-red-500 hover:bg-red-600",
        icon: XCircle,
      };
    case "nfe inutilizada":
      return {
        label: "Inutilizada",
        color: "bg-yellow-500 hover:bg-yellow-600",
        icon: AlertCircle,
      };
    default:
      return {
        label: status || "Desconhecido",
        color: "bg-gray-500 hover:bg-gray-600",
        icon: HelpCircle,
      };
  }
}
