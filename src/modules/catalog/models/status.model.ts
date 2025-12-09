import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

// Состояния прибора (Годен, Не годен, Утерян, Списан, Забракован, длительное хранение)
export const statuses = pgTable('statuses', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
});
