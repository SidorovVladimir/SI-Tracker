import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

// Роль пользователя
export const roles = pgTable('roles', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull(),
});
