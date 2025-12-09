import {
  boolean,
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

// Прибор (Инструмент)
export const devices = pgTable('devices', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull(),                           // Наименование прибора
  model: varchar('model', { length: 50 }).notNull(),                         // Модель прибора
  serialNumber: varchar('serial_number', { length: 100 }).notNull(),         // Серийный номер прибора
  releaseDate: timestamp('release_date', { mode: 'string' }),                // Дата выпуска
  grsiNumber: varchar('grsi_number', { length: 100 }).notNull(),             // ГРСИ
  measurementRange: varchar('measurement_range', { length: 100 }).notNull(), // Диапазон измерений
  accuracy: varchar('accuracy', { length: 100 }).notNull(),                  // Точность 
  inventoryNumber: varchar('inventory_number', { length: 100 }).notNull(),   // Инвентарный номер
  receiptDate: timestamp('receipt_date', { mode: 'string' }),                // Дата получения
  manufacturer: varchar('manufacturer', { length: 100 }),                    // Производитель
  verificationInterval: integer('verification_interval'),                    // МПИ (межповерочный интервал)
  archived: boolean('archived').notNull().default(false),                    // В архиве
  nomenclature: varchar('nomenclature', { length: 50 }),                     // Номенклатура по 1С
  createdAt: timestamp('created_at').defaultNow(),
});