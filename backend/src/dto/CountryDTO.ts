import { ApiProperty } from '@nestjs/swagger';
import { Country } from '../entities/country.entity';

export class CountryDTO {
  /**
   * ISO Country code.
   */
  @ApiProperty({ example: 'LV', description: 'ISO Country code' })
  code: string;

  /**
   * Country name.
   */
  @ApiProperty({ example: 'Latvia', description: 'Country name' })
  name: string;

  constructor(country: Country) {
    this.code = country.code;
    this.name = country.name;
  }
}
