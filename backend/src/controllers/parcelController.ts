import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  Param,
  Query,
  HttpException,
  HttpStatus,
  ConflictException,
  ParseIntPipe,
} from '@nestjs/common';
import { Parcel } from '../entities/parcel.entity';
import { ParcelService } from '../services/parcel.service';
import { ParcelDTO } from '../dto/ParcelDTO';
import {
  ApiCreatedResponse,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Parcel')
@Controller('parcel')
export class ParcelController {
  constructor(
    @Inject(ParcelService) private readonly parcelService: ParcelService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a parcel' })
  @ApiBody({ type: ParcelDTO })
  @ApiCreatedResponse({ description: 'The created parcel', type: ParcelDTO })
  async createParcel(@Body() parcelData: ParcelDTO): Promise<ParcelDTO> {
    try {
      return await this.parcelService.createParcel(parcelData);
    } catch (err) {
      if (err instanceof ConflictException) {
        throw new HttpException('SKU already exists', HttpStatus.CONFLICT);
      }
      throw err;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all parcels' })
  @ApiQuery({
    name: 'sortByDeliveryDate',
    required: false,
    enum: ['ASC', 'DESC'],
  })
  @ApiQuery({ name: 'country', required: false, type: String })
  @ApiQuery({ name: 'description', required: false, type: String })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
    example: 1,
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    type: Number,
    description: 'Number of items per page',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'List of parcels',
    type: ParcelDTO,
    isArray: true,
  })
  async findAll(
    @Query('sortByDeliveryDate') sortByDeliveryDate?: 'ASC' | 'DESC',
    @Query('country') country?: string,
    @Query('description') description?: string,
    @Query('page', ParseIntPipe) page = 1,
    @Query('pageSize', ParseIntPipe) pageSize = 10,
  ): Promise<{ parcels: ParcelDTO[]; totalCount: number }> {
    const { parcels, totalCount } = await this.parcelService.getAllParcels(
      sortByDeliveryDate,
      country,
      description,
      page,
      pageSize,
    );

    const parcelDTOs = parcels.map((parcel) => new ParcelDTO(parcel));

    return { parcels: parcelDTOs, totalCount };
  }

  @Get(':sku/validate')
  @ApiOperation({ summary: 'Validate SKU' })
  @ApiParam({ name: 'sku', description: 'The SKU to validate' })
  @ApiResponse({ status: 200, description: 'Validation result', type: Boolean })
  async validateSKU(@Param('sku') sku: string): Promise<{ valid: boolean }> {
    const valid = await this.parcelService.validateSKU(sku);
    return { valid };
  }
}
