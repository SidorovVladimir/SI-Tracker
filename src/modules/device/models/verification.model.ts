import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

// Данные о поверках
export const verifications = pgTable('verifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  date: timestamp('date', { mode: 'string' }).notNull(),       // Дата проведения
  validUntil: timestamp('valid_until', { mode: 'string' }),    // Дата окончания срока действия
  result: text('result'),                                      // Результат
  protocolNumber: varchar('protocol_number', { length: 50 }),  // Номер протокола/свидетельства
  organization: varchar('organization', { length: 255 }),      // Организация проводившая поверку
  comment: text('comment'),                                    // Примечание
  documentUrl: text('document_url'),                           // Ссылка на документ поверки
});
