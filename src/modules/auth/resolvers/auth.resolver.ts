import { ZodError } from 'zod';
import { CreateUserInputSchema } from '../../user/dto/CreateUserDto';
import type { User } from '../../user/user.types';
import { AuthenticationError, formatZodErrors } from '../../../utils/errors';
import { UserService } from '../../user/service/user.service';
import jwt from 'jsonwebtoken';
import { LoginInputSchema } from '../dto/LoginDto';
import { AuthService } from '../service/auth.service';
import { setAuthCookie } from '../../../utils/auth';

export const Query = {
  me: (_: unknown, __: unknown, context: any) => {
    if (!context.currentUser) {
      throw new AuthenticationError();
    }
    return context.currentUser;
  },
};

export const Mutation = {
  register: async (
    _: unknown,
    {
      input,
    }: {
      input: unknown;
    },
    { res }: { res: any }
  ) => {
    try {
      const validatedInput = CreateUserInputSchema.parse(input);
      const user = await UserService.createUser(validatedInput);
      setAuthCookie(res, user);
      return {
        success: true,
        user,
      };
    } catch (err) {
      if (err instanceof ZodError) {
        throw new Error(JSON.stringify(formatZodErrors(err)));
      }
      throw err;
    }
  },
  login: async (
    _: unknown,
    { input }: { input: unknown },
    { res }: { res: any }
  ) => {
    try {
      const validatedInput = LoginInputSchema.parse(input);
      const user = await AuthService.Login(validatedInput);
      setAuthCookie(res, user);
      return {
        success: true,
        user,
      };
    } catch (err) {
      if (err instanceof ZodError) {
        throw new Error(JSON.stringify(formatZodErrors(err)));
      }
      throw err;
    }
  },
};
