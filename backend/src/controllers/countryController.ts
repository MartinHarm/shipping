import { Controller, Get, Inject } from '@nestjs/common';
import { CountryService } from '../services/country.service';
import { CountryDTO } from '../dto/CountryDTO';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Country')
@Controller('country')
export class CountryController {
  constructor(
      @Inject(CountryService) private readonly countryService: CountryService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all countries' })
  @ApiResponse({ status: 200, description: 'List of countries', type: CountryDTO, isArray: true })
  async getAllCountries(): Promise<CountryDTO[]> {
    const countries = await this.countryService.getAllCountries();
    return countries.map((country) => new CountryDTO(country));
  }
}
