import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parcel } from '../entities/parcel.entity';
import { ParcelDTO } from '../dto/ParcelDTO';
import { CountryService } from './country.service';

@Injectable()
export class ParcelService {
  constructor(
    @InjectRepository(Parcel)
    private readonly parcelRepository: Repository<Parcel>,
    private readonly countryService: CountryService,
  ) {}

  async createParcel(parcelData: ParcelDTO): Promise<ParcelDTO> {
    const { countrycode, ...rest } = parcelData;
    const country = await this.countryService.getCountryByCode(countrycode);
    const newParcel = this.parcelRepository.create({
      ...rest,
      country: country,
    });

    return this.parcelRepository.manager.transaction(
      async (transactionalEntityManager) => {
        try {
          await transactionalEntityManager.save(newParcel);
        } catch (err) {
          if (err.code === '23505' && err.constraint === 'parcel_sku_key') {
            throw new ConflictException('SKU already exists');
          }
          throw err;
        }

        return new ParcelDTO(newParcel);
      },
    );
  }

  async getAllParcels(
    sortByDeliveryDate?: 'ASC' | 'DESC',
    country?: string,
    description?: string,
    page = 1,
    pageSize = 10,
  ): Promise<{ parcels: Parcel[]; totalCount: number }> {
    sortByDeliveryDate = sortByDeliveryDate
      ? sortByDeliveryDate === 'ASC'
        ? 'ASC'
        : 'DESC'
      : 'ASC';

    let query = this.parcelRepository
      .createQueryBuilder('parcel')
      .leftJoinAndSelect('parcel.country', 'country');

    // FIXME - the column names in entities, DTOs, and the database are not in proper convention... delivery_date?
    query = query
      .orderBy('parcel.deliverydate', sortByDeliveryDate)
      .skip((page - 1) * pageSize)
      .take(pageSize);

    if (country) {
      query = query.andWhere('LOWER(country.code) = LOWER(:country)', {
        country: country.toLowerCase(),
      });
    }

    if (description) {
      query = query.andWhere(
        'LOWER(parcel.description) LIKE LOWER(:description)',
        { description: `%${description.toLowerCase()}%` },
      );
    }

    const [parcels, totalCount] = await query.getManyAndCount(); // Get parcels and total count

    return { parcels, totalCount };
  }

  async validateSKU(sku: string): Promise<boolean> {
    const parcel = await this.parcelRepository.findOne({ where: { sku } });
    return !parcel;
  }
}
