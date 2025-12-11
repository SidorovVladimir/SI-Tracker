import { companies } from "../models/company.model";

export type CompanyEntity = typeof companies.$inferSelect;
export type NewCompany = typeof companies.$inferInsert;