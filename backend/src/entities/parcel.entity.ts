import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Country } from './country.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Parcel {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'SKU12345',
    description: 'The stock keeping unit (SKU) of the parcel.',
  })
  @Column({ unique: true })
  sku: string;

  @ApiProperty({
    example: 'Parcel description',
    description: 'The description of the parcel.',
  })
  @Column()
  description: string;

  @Column()
  streetaddress: string;

  @ApiProperty({ example: 'Town name', description: 'The town of the parcel.' })
  @Column()
  town: string;

  @ApiProperty({
    example: 'US',
    description: 'The country of the parcel.',
  })
  @ManyToOne((type) => Country)
  @JoinColumn({ name: 'country_id', referencedColumnName: 'id' })
  country: Country;

  @ApiProperty({
    example: '2023-04-13',
    description: 'Delivery date',
    type: Date,
    format: 'yyyy-MM-dd',
  })
  @Column()
  deliverydate: Date;
}
