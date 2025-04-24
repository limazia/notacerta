import axios from "axios";

import type { AnalyzeXMLSchema } from "@/schemas/analyze.schema";

interface AnalyzeResponse {
  id: string;
}

export async function analyzeXML(payload: AnalyzeXMLSchema) {
  const { data } = await axios.post<AnalyzeResponse>("/api/analyze", payload);

  return data;
}
