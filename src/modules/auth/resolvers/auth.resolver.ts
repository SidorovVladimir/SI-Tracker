import { ZodError } from 'zod';
import { CreateUserInputSchema } from '../../user/dto/CreateUserDto';
import { AuthenticationError, formatZodErrors } from '../../../utils/errors';
import { LoginInputSchema } from '../dto/LoginDto';
import { AuthService } from '../service/auth.service';
import { setAuthCookie } from '../../../utils/auth';
import { Context } from '../../../context';

export const Query = {
  me: (_: unknown, __: unknown, { currentUser }: Context) => {
    if (!currentUser) {
      throw new AuthenticationError();
    }
    return currentUser;
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
    { db, res }: Context
  ) => {
    try {
      const validatedInput = CreateUserInputSchema.parse(input);
      const user = await new AuthService(db).register(validatedInput);
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
    { res, db }: Context
  ) => {
    try {
      const validatedInput = LoginInputSchema.parse(input);
      const user = await new AuthService(db).Login(validatedInput);
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
