import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

// Тип оборудования (СИ, СК, ИО, ВО, Индикатор)
export const equipmentTypes = pgTable('equipment_types', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
});

// Вид измерения (Электрические, радиоэлектронные, теплотехнические, геометрические, механические, физико-химические, виброакустические, микроклимат)
export const measurementTypes = pgTable('measurement_types', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
});

// Виды метрологического контроля (Поверка, калибровка, аттестация, осмотр)
export const metrologyControlTypes = pgTable('metrology_control_types', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
});

// Сферы применения (ГРОЕИ и прочие) (ОТ, учет ресурсов, ПБ, сертификация продукции, аккредитация ИЛ, правовое поле, добровольно)
export const scopes = pgTable('scopes', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
});
// Состояния прибора (Годен, Не годен, Утерян, Списан, Забракован, длительное хранение)
export const statuses = pgTable('statuses', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
});
