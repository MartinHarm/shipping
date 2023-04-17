import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Parcel } from './parcel.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'LV', description: 'The code of the country.' })
  @Column()
  code: string;

  @ApiProperty({ example: 'LV', description: 'The code of the country.' })
  @Column()
  name: string;

  @OneToMany((type) => Parcel, (parcel) => parcel.country)
  parcels: Parcel[];
}
