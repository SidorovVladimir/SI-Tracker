import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

// Тип оборудования (СИ, СК, ИО, ВО, Индикатор)
export const equipmentTypes = pgTable('equipment_types', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
});