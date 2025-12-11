import { productionSites } from "../models/productionSites.model";

export type ProductionSiteEntity = typeof productionSites.$inferSelect;

export type NewProdictionSite = typeof productionSites.$inferInsert;