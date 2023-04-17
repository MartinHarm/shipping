import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParcelModule } from './parcels.module';
import { Parcel } from './entities/parcel.entity';
import { Country } from './entities/country.entity';

@Module({
  imports: [
    ParcelModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DATABASE_HOST'),
        port: config.get('DATABASE_PORT'),
        username: config.get('DATABASE_USERNAME'),
        password: config.get('DATABASE_PASSWORD'),
        database: config.get('DATABASE_DATABASE'),
        synchronize: config.get('DATABASE_SYNCHRONIZE'),
        entities: [Parcel, Country],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
