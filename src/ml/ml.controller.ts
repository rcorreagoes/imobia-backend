import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PredictPropertyDto } from './dto/predict-property.dto.js';
import { MlService } from './ml.service.js';

@Controller('ml')
export class MlController {
  constructor(private readonly mlService: MlService) {}

  @Get()
  async healthCheck() {
    return await this.mlService.healthCheck();
  }

  @Post('predict')
  @UsePipes(new ValidationPipe({ transform: true }))
  async predict(@Body() dto: PredictPropertyDto) {
    return await this.mlService.predictPrice(dto);
  }

  @Get('trends/:district')
  async getTrends(
    @Param('district') district: string,
    @Query('municipality') municipality?: string,
    @Query('property_type') propertyType?: string,
  ) {
    return await this.mlService.getDistrictTrends(
      district,
      municipality,
      propertyType,
    );
  }

  @Get('locations')
  async getLocations() {
    return await this.mlService.getLocations();
  }

  @Get('property-types')
  async getPropertyTypes() {
    return await this.mlService.getPropertyTypes();
  }
}
