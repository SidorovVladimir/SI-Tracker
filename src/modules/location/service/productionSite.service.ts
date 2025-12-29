import { DrizzleDB } from '../../../db/client';
import { CreateProductionSiteInput } from '../dto/CreateProductionSiteDto';

export class ProductionSiteService {
  constructor(private db: DrizzleDB) {}
  async getProductionSites() {}
  async getProductionSite(id: string) {}
  async createProductionSite(input: CreateProductionSiteInput) {}
}
