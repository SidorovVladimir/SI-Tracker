import { ZodError } from 'zod';
import { CreateCompanyInputSchema } from '../dto/CreateCompanyDto';
import { CompanyService } from '../service/company.service';
import { formatZodErrors } from '../../../utils/errors';
import { Context } from '../../../context';

export const Query = {
  companies: async (_: unknown, __: unknown, { db }: Context) => {
    return await new CompanyService(db).getCompanies();
  },

  company: async (_: unknown, { id }: { id: string }, { db }: Context) => {
    return await new CompanyService(db).getCompany(id);
  },
};

export const Mutation = {
  createCompany: async (
    _: unknown,
    { input }: { input: unknown },
    { db }: Context
  ) => {
    try {
      const validatedInput = CreateCompanyInputSchema.parse(input);

      return await new CompanyService(db).createCompany(validatedInput);
    } catch (err) {
      if (err instanceof ZodError) {
        throw new Error(JSON.stringify(formatZodErrors(err)));
      }
      throw err;
    }
  },
};
