import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

// Виды метрологического контроля (Поверка, калибровка, аттестация, осмотр)
export const metrologyControleTypes = pgTable('metrology_controle_types', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
});
