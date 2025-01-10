import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { PropertyType } from '../entities/property.entity';

export class CreatePropertyDto {
  @IsOptional()
  title_tm: string;

  @IsOptional()
  title_ru: string;

  @IsOptional()
  title_en: string;

  @IsOptional()
  value_tm: string;

  @IsOptional()
  value_ru: string;

  @IsOptional()
  value_en: string;

  @IsIn([PropertyType.COLOR, PropertyType.PLAIN])
  type: PropertyType;

  @IsNotEmpty()
  product_id: number;
}
