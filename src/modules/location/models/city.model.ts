import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

// Город
export const cities = pgTable('cities', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
