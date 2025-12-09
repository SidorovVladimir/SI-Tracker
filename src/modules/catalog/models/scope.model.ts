import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

// Сферы применения (ГРОЕИ и прочие) (ОТ, учет ресурсов, ПБ, сертификация продукции, аккредитация ИЛ, правовое поле, добровольно)
export const scopes = pgTable('scopes', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
});