import { z } from 'zod';
import { CreateUserInputSchema } from './CreateUserDto';

export const UpdateUserInputSchema = CreateUserInputSchema.omit({
  email: true,
  password: true,
});

export type UpdateUserInput = z.infer<typeof UpdateUserInputSchema>;
