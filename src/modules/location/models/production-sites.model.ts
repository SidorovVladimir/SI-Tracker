import { pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';
import { legalEntities } from './organization.model';
import { cities } from './city.model';

// Производственная площадка (Участок)
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
