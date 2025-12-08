import { pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';

export const cities = pgTable('cities', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
});

export const legalEntities = pgTable('legal_entities', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  cityId: uuid('city_id')
    .notNull()
    .references(() => cities.id, { onDelete: 'restrict' }),
  address: text('address'),
});

export const productionSites = pgTable('production_sites', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  legalEntityId: uuid('legal_entity_id')
    .notNull()
    .references(() => legalEntities.id, { onDelete: 'cascade' }),
  cityId: uuid('city_id')
    .notNull()
    .references(() => cities.id, { onDelete: 'restrict' }),
});
