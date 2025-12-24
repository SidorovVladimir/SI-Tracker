import { db } from '../../../db/client';
import { CreateCityInput } from '../dto/CreateCityDto';
import { cities } from '../models/city.model';
import { CityEntity, NewCity } from '../types/city.types';

export class CityService {
  static async getCities(): Promise<CityEntity[]> {
    return await db.select().from(cities);
  }

  static async createCity(input: CreateCityInput): Promise<CityEntity> {
    const cityData: NewCity = {
      name: input.name,
    };
    const [city] = await db.insert(cities).values(cityData).returning();
    if (!city) {
      throw new Error('Failed to create city');
    }
    return city;
  }
}
