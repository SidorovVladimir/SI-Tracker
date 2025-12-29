import { DrizzleDB } from '../../../db/client';
import { CreateCityInput } from '../dto/CreateCityDto';
import { cities } from '../models/city.model';
import { CityEntity, NewCity } from '../types/city.types';

export class CityService {
  constructor(private db: DrizzleDB) {}
  async getCities(): Promise<CityEntity[]> {
    return await this.db.select().from(cities);
  }

  async createCity(input: CreateCityInput): Promise<CityEntity> {
    const cityData: NewCity = {
      name: input.name,
    };
    const [city] = await this.db.insert(cities).values(cityData).returning();
    if (!city) {
      throw new Error('Failed to create city');
    }
    return city;
  }
}
