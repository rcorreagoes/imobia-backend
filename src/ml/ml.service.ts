import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { PredictPropertyDto } from './dto/predict-property.dto.js';

@Injectable()
export class MlService {
  private readonly pythonApiUrl =
    process.env.PYTHON_ML_URL || 'http://localhost:8000';

  async healthCheck(): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.pythonApiUrl}/`),
      );
      return response.data;
    } catch (error: unknown) {
      throw new InternalServerErrorException(
        `Erro ao comunicar com a engine de Machine Learning: ${(error as any).message}`,
      );
    }
  }

  constructor(private readonly httpService: HttpService) {}

  async predictPrice(data: PredictPropertyDto): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.pythonApiUrl}/predict`, data),
      );

      return response.data;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Erro desconhecido';

      throw new InternalServerErrorException(
        `Erro ao comunicar com a engine de Machine Learning: ${message}`,
      );
    }
  }

  async getDistrictTrends(
    district: string,
    municipality?: string,
    propertyType?: string,
  ): Promise<any> {
    try {
      // Construir os query params dinamicamente para enviar ao FastAPI
      const params: Record<string, string> = {};
      if (municipality) params.municipality = municipality;
      if (propertyType) params.property_type = propertyType;

      const response = await firstValueFrom(
        this.httpService.get(
          `${this.pythonApiUrl}/trends/${encodeURIComponent(district)}`,
          { params },
        ),
      );
      return response.data;
    } catch (error: unknown) {
      if ((error as any).response?.status === 404) {
        throw new NotFoundException(
          `Dados de tendências não encontrados para o distrito '${district}'.`,
        );
      }
      const message =
        error instanceof Error ? error.message : 'Erro desconhecido';
      throw new InternalServerErrorException(
        `Erro ao buscar tendências históricas: ${message}`,
      );
    }
  }

  async getLocations(): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.pythonApiUrl}/locations`),
      );
      return response.data;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Erro desconhecido';
      throw new InternalServerErrorException(
        `Erro ao buscar localizações: ${message}`,
      );
    }
  }

  async getPropertyTypes(): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.pythonApiUrl}/property-types`),
      );
      return response.data;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Erro desconhecido';
      throw new InternalServerErrorException(
        `Erro ao buscar tipos de imóvel: ${message}`,
      );
    }
  }
}
