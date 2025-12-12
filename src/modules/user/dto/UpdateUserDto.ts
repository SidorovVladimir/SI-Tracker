import { z } from 'zod';

export const UpdateUserInputSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  email: z.email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type UpdateUserInput = z.infer<typeof UpdateUserInputSchema>;
