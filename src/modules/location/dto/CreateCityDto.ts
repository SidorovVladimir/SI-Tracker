import { z } from "zod";


export const CreateCityInputSchema = z.object({
    name: z.string().min(1, 'Name is required').max(50),
});

export type CreateCityInput = z.infer<typeof CreateCityInputSchema>;
