import { CreateUserInputSchema } from '../../user/dto/CreateUserDto';
import { z } from 'zod';

export const LoginInputSchema = CreateUserInputSchema.omit({
  firstName: true,
  lastName: true,
});

export type LoginInput = z.infer<typeof LoginInputSchema>;
