import { z } from "zod";

export const CreateEquipmentTypeInputSchema = z.object({
    name: z.string().min(1, "Name is required"),
});

export type CreateEquipmentTypeInput = z.infer<typeof CreateEquipmentTypeInputSchema>;