import { DrizzleDB } from '../../../db/client';
import { CreateCompanyInput } from '../dto/CreateCompanyDto';

export class CompanyService {
  constructor(private db: DrizzleDB) {}
  async getCompanies() {}
  async getCompany(id: string) {}
  async createCompany(input: CreateCompanyInput) {}
}
