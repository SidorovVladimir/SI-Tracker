// services/user.service.ts
import { db } from '../db/client';
import { NewUser, users } from '../entities/user/model';
import { eq } from 'drizzle-orm';
import { hashPassword } from '../utils/auth';
import type { User } from '../types/user.types';
import { CreateUserInput } from '../schemas/user.schema';

export class UserService {
  static async getUsers(): Promise<User[]> {
    return await db
      .select({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
        createdAt: users.createdAt,
      })
      .from(users);
  }

  static async createUser(input: CreateUserInput): Promise<User> {
    const userData: NewUser = {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      password: await hashPassword(input.password),
    };

    const [user] = await db.insert(users).values(userData).returning();

    if (!user) {
      throw new Error('Failed to create user');
    }
    const { password, ...publicUser } = user;
    return publicUser;
  }

  static async findUserById(id: number) {
    return await db.query.users.findFirst({ where: eq(users.id, id) });
  }
}
