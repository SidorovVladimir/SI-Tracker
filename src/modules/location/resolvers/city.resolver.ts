import { ZodError } from 'zod';
import { CreateCityInputSchema } from '../dto/CreateCityDto';
import { CityService } from '../service/city.service';
import { formatZodErrors } from '../../../utils/errors';
import { CityEntity } from '../types/city.types';
import { Context } from '../../../context';

export const Query = {
  cities: async (_: unknown, __: unknown, { db }: Context) => {
    return await new CityService(db).getCities();
  },
  city: async (_: unknown, { id }: { id: string }) => {},
};

export const Mutation = {
  createCity: async (
    _: unknown,
    { input }: { input: unknown },
    { db }: Context
  ): Promise<CityEntity> => {
    try {
      const validatedInput = CreateCityInputSchema.parse(input);
      return await new CityService(db).createCity(validatedInput);
    } catch (err) {
      if (err instanceof ZodError) {
        throw new Error(JSON.stringify(formatZodErrors(err)));
      }
      throw err;
    }
  },
};
