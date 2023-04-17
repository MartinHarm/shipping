import { ApiProperty } from '@nestjs/swagger';
import { CountryDTO } from './CountryDTO';
import { Parcel } from '../entities/parcel.entity';
export class ParcelDTO {
  /**
   * Parcel SKU.
   */
  @ApiProperty({ example: 'ABC123', description: 'Parcel SKU' })
  sku: string;

  /**
   * Parcel description.
   */
  @ApiProperty({ example: 'Example parcel', description: 'Parcel description' })
  description: string;

  /**
   * Street address.
   */
  @ApiProperty({ example: '1234 Example St', description: 'Street address' })
  streetaddress: string;

  /**
   * Town or city name.
   */
  @ApiProperty({ example: 'Example Town', description: 'Town or city name' })
  town: string;

  /**
   * Country information.
   */
  @ApiProperty({ example: 'LV', description: 'ISO Country code' })
  countrycode: string;

  /**
   * Delivery date.
   */
  @ApiProperty({
    example: '2023-04-13',
    description: 'Delivery date',
    type: Date,
    format: 'yyyy-MM-dd',
  })
  deliverydate: Date;

  constructor(parcel: Parcel) {
    this.sku = parcel.sku;
    this.description = parcel.description;
    this.streetaddress = parcel.streetaddress;
    this.town = parcel.town;
    this.countrycode = parcel.country.code;
    this.deliverydate = parcel.deliverydate;
  }
}
