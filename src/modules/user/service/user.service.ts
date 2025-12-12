import { db } from '../../../db/client';
import { users } from '../user.model';
import { eq } from 'drizzle-orm';
import { hashPassword } from '../../../utils/auth';
import type { User, NewUser } from '../user.types';
import { CreateUserInput } from '../dto/CreateUserDto';
import { UpdateUserInput } from '../dto/UpdateUserDto';

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

  static async createUser(input: CreateUserInput): Promise<User> {
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
