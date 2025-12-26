import { db } from '../../../db/client';
import { users } from '../user.model';
import { eq } from 'drizzle-orm';
import { hashPassword } from '../../../utils/auth';
import type { User, NewUser } from '../user.types';
import { CreateUserInput } from '../dto/CreateUserDto';
import { UpdateUserInput } from '../dto/UpdateUserDto';
import { AuthenticationError } from '../../../utils/errors';

export class UserService {
  static async getUsers(): Promise<User[]> {
    return await db
      .select({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users);
  }

  static async getUser(userId: string): Promise<User> {
    const result = await db
      .select({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!result[0]) {
      throw new Error(`Пользователь с ID ${userId} не найден`);
    }
    return result[0];
  }

  static async getByEmail(email: string) {
    const result = await db
      .select({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
        password: users.passwordHash,
      })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!result[0]) {
      return null;
    }
    return result[0];
  }

  static async createUser(input: CreateUserInput) {
    const existUser = await this.getByEmail(input.email);

    if (existUser)
      throw new AuthenticationError(
        'Пользователь с таким почтовым адресом существует'
      );
    const userData: NewUser = {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      passwordHash: await hashPassword(input.password),
    };

    const [user] = await db.insert(users).values(userData).returning();

    if (!user) {
      throw new Error('Failed to create user');
    }
    const { passwordHash, ...publicUser } = user;
    return publicUser;
  }

  static async updateUser(
    userId: string,
    input: UpdateUserInput
  ): Promise<User> {}
}
