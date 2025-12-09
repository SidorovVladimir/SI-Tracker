import { pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';
import { organizations } from './organization.model';
import { cities } from './city.model';

// Производственная площадка (Участок)
export const productionSites = pgTable('production_sites', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  legalEntityId: uuid('legal_entity_id')
    .notNull()
    .references(() => organizations.id, { onDelete: 'cascade' }),
  cityId: uuid('city_id')
    .notNull()
    .references(() => cities.id, { onDelete: 'restrict' }),
});
