import { pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';

// Город
export const cities = pgTable('cities', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
});
