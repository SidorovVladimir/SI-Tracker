import { z } from "zod";

export const CreateMetrologyControleTypeInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type CreateMetrologyControleTypeInput = z.infer<
  typeof CreateMetrologyControleTypeInputSchema
>;
