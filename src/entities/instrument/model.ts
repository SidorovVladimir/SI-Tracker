import {
  boolean,
  date,
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const devices = pgTable('devices', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  serialNumber: varchar('serial_number', { length: 100 }).notNull(),
  releaseDate: date('release_date', { mode: 'string' }),
  grsiNumber: varchar('grsi_number', { length: 100 }).notNull(),
  measurementRange: varchar('measurement_range', { length: 100 }).notNull(),
  accuracy: varchar('accuracy', { length: 100 }).notNull(),
  inventoryNumber: varchar('inventory_number', { length: 100 }).notNull(),
  receiptDate: date('receipt_date', { mode: 'string' }),
  fabricator: varchar('fabricator', { length: 100 }),
  verificationInterval: integer('verification_interval'),
  archived: boolean('archived').notNull().default(false),
  nomenclature: varchar('nomenclature', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow(),
});

export type Device = typeof devices.$inferSelect;
export type NewDevice = typeof devices.$inferInsert;

// instruments  verifications, comments, documents, instrumentScopes;
