import { ZodError } from 'zod';
import {
  CreateProductionSiteInput,
  CreateProductionSiteInputSchema,
} from '../dto/CreateProductionSiteDto';
import { ProductionSiteService } from '../service/productionSite.service';
import { formatZodErrors } from '../../../utils/errors';

export const Query = {
  productionSites: async () => {
    return ProductionSiteService.getProductionSites();
  },
  productionSite: async (_: unknown, { id }: { id: string }) => {
    return ProductionSiteService.getProductionSite(id);
  },
};

export const Mutation = {
  createProductionSite: async (
    _: unknown,
    { input }: { input: CreateProductionSiteInput }
  ) => {
    try {
      const validatedInput = CreateProductionSiteInputSchema.parse(input);
      return await ProductionSiteService.createProductionSite(validatedInput);
    } catch (err) {
      if (err instanceof ZodError) {
        throw new Error(JSON.stringify(formatZodErrors(err)));
      }
      throw err;
    }
  },
};
