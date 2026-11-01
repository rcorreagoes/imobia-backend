import { IsInt, IsNumber, IsString } from 'class-validator';

export class PredictPropertyDto {
  @IsString()
  District: string;

  @IsString()
  City: string;

  @IsString()
  Type: string;

  @IsNumber()
  TotalArea: number;

  @IsNumber()
  LivingArea: number;

  @IsInt()
  NumberOfBedrooms: number;

  @IsInt()
  NumberOfBathrooms: number;

  @IsString()
  Garage: string;

  @IsString()
  Elevator: string;

  @IsInt()
  ConstructionYear: number;

  @IsString()
  EnergyCertificate: string;
}
