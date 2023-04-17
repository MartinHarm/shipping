import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from '../entities/country.entity'; // Import the Country entity

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async getAllCountries(): Promise<Country[]> {
    return await this.countryRepository.find();
  }

  async getCountryByCode(code: string): Promise<Country> {
    const country = await this.countryRepository.findOne({ where: { code } });
    if (!country) {
      throw new NotFoundException(`Country with code ${code} not found`);
    }
    return country;
  }
}
