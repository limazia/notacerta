import { api } from "@/lib/axios";

interface AnalyzeXMLResponse {
  id: string;
}

export async function analyzeXML(payload: { xml: string }) {
  const { data } = await api.post<AnalyzeXMLResponse>("/analyze", payload);

  return data;
}
