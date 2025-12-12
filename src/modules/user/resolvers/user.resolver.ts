import { UserService } from '../service/user.service';
import { CreateUserInputSchema } from '../dto/CreateUserDto';
import { ZodError } from 'zod';
import { formatZodErrors } from '../../../utils/error';
import type { User } from '../user.types';
import { UpdateUserInputSchema } from '../dto/UpdateUserDto';

export const Query = {
  users: async (_: unknown, __: unknown, context: any): Promise<User[]> => {
    return await UserService.getUsers();
  },
  user: async (_: unknown, { id }: { id: string }): Promise<User> => {
    return await UserService.getUser(id);
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

  updateUser: async (
    _: unknown,
    { id, input }: { id: string; input: unknown }
  ): Promise<User> => {
    try {
      const validatedInput = UpdateUserInputSchema.parse(input);
      return await UserService.updateUser(id, validatedInput);
    } catch (err) {
      if (err instanceof ZodError) {
        throw new Error(JSON.stringify(formatZodErrors(err)));
      }
      throw err;
    }
  },
};
