import { pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';

// Компания (ООО Рога и Копыта)
export const companies = pgTable('companies', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  address: text('address'),
});

