import { db } from '../db/client';
import { hashPassword } from '../utils/auth';
import { users } from '../entities/user/model';
import { eq } from 'drizzle-orm';
import { UserService } from '../services/user.service';
import { CreateUserInputSchema } from '../schemas/user.schema';
import { ZodError } from 'zod';
import { formatZodErrors } from '../utils/error';
import type { User } from '../types/user.types';

export const Query = {
  users: async (_: unknown, __: unknown, context: any): Promise<User[]> => {
    return await UserService.getUsers();
  },
  user: async (_: unknown, { id }: { id: number }) => {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    return result[0] || null;
  },
};

export const Mutation = {
  createUser: async (
    _: unknown,
    {
      input,
    }: {
      input: unknown;
    }
  ): Promise<User> => {
    try {
      const validatedInput = CreateUserInputSchema.parse(input);
      return await UserService.createUser(validatedInput);
    } catch (err) {
      if (err instanceof ZodError) {
        throw new Error(JSON.stringify(formatZodErrors(err)));
      }
      throw err;
    }
  },
};
