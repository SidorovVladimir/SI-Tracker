import { cities } from "../models/city.model";

export type CityEntity = typeof cities.$inferSelect;
export type NewCity = typeof cities.$inferInsert;