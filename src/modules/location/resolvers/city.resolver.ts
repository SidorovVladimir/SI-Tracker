import { ZodError } from 'zod';
import { CreateCityInputSchema } from '../dto/CreateCityDto';
import { CityService } from '../service/city.service';
import { formatZodErrors } from '../../../utils/error';
import { CityEntity } from '../types/city.types';

export const Query = {
  cities: async () => {
    return await CityService.getCities();
  },
  city: async (_: unknown, { id }: { id: string }) => {},
};

export const Mutation = {
  createCity: async (
    _: unknown,
    { input }: { input: unknown }
  ): Promise<CityEntity> => {
    try {
      const validatedInput = CreateCityInputSchema.parse(input);
      return await CityService.createCity(validatedInput);
    } catch (err) {
      if (err instanceof ZodError) {
        throw new Error(JSON.stringify(formatZodErrors(err)));
      }
      throw err;
    }
  },
};
