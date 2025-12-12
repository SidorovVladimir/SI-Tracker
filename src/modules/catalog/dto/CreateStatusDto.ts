import { z } from 'zod';

export const CreateStatusInputSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

export type CreateStatusInput = z.infer<typeof CreateStatusInputSchema>;
