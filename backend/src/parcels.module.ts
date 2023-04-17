import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parcel } from './entities/parcel.entity';
import { Country } from './entities/country.entity';
import { ParcelController } from './controllers/parcelController';
import { ParcelService } from './services/parcel.service';
import { CountryController } from './controllers/countryController';
import { CountryService } from './services/country.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Parcel, Country]),
  ],
  controllers: [ParcelController, CountryController],
  providers: [
    ParcelService,
    CountryService,
  ],
})
export class ParcelModule {}
