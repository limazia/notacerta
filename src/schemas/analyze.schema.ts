import { z } from "zod";

export const analyzeXMLSchema = z.object({
  xml: z.string().min(1, "O XML é obrigatório."),
});

export type AnalyzeXMLSchema = z.infer<typeof analyzeXMLSchema>;
