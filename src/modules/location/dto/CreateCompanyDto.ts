import { z } from "zod";

export const CreateCompanyInputSchema = z.object({
    name: z.string().min(1, 'Name is required').max(50),
});

export type CreateCompanyInput = z.infer<typeof CreateCompanyInputSchema>;