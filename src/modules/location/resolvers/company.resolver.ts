import { ZodError } from 'zod';
import { CreateCompanyInputSchema } from '../dto/CreateCompanyDto';
import { CompanyService } from '../service/company.service';
import { formatZodErrors } from '../../../utils/error';

export const Query = {
  companies: async () => {
    return await CompanyService.getCompanies();
  },

  company: async (_: unknown, { id }: { id: string }) => {
    return await CompanyService.getCompany(id);
  },
};

export const Mutation = {
  createCompany: async (_: unknown, { input }: { input: unknown }) => {
    try {
      const validatedInput = CreateCompanyInputSchema.parse(input);

      return await CompanyService.createCompany(validatedInput);
    } catch (err) {
      if (err instanceof ZodError) {
        throw new Error(JSON.stringify(formatZodErrors(err)));
      }
      throw err;
    }
  },
};
