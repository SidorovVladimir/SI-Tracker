import { ZodError } from 'zod';
import { CreateUserInputSchema } from '../../user/dto/CreateUserDto';
import type { User } from '../../user/user.types';
import { AuthenticationError, formatZodErrors } from '../../../utils/errors';
import { UserService } from '../../user/service/user.service';
import jwt from 'jsonwebtoken';
import { LoginInputSchema } from '../dto/LoginDto';
import { AuthService } from '../service/auth.service';

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
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      );

      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/graphql',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
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
      return await AuthService.Login(validatedInput);
    } catch (err) {
      if (err instanceof ZodError) {
        throw new Error(JSON.stringify(formatZodErrors(err)));
      }
      throw err;
    }
  },
};
