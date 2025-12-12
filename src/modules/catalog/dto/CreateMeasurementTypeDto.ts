import z from "zod";

export const CreateMeasurementTypeInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type CreateMeasurementTypeInput = z.infer<
  typeof CreateMeasurementTypeInputSchema
>;
