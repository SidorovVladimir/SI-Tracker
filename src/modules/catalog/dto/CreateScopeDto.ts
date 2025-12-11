import z from "zod";

export const CreateScopeInputSchema = z.object({
    name: z.string().min(1, 'Name is required'),
});


export type CreateScopeInput = z.infer<typeof CreateScopeInputSchema>;