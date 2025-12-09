import { pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';
import { cities } from './city.model';

// Юридическое лицо
export const organizations = pgTable('organizations', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  cityId: uuid('city_id')
    .notNull()
    .references(() => cities.id, { onDelete: 'restrict' }),
  address: text('address'),
});

