import { CreateCityInput } from "../dto/CreateCityDto";
import { NewCity } from "../types/city.types";

export class CityService {
    static async getCities() {
       
    }

    static async createCity(input: CreateCityInput) {

        const cityData: NewCity = {
            name: input.name,
        };
    }
}