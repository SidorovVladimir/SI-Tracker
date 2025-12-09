import { users } from './user.model';

export type UserEntity = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;


export type User = Omit<UserEntity, 'password'>;
