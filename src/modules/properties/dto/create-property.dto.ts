import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { PropertyType } from '../entities/property.entity';

export class CreatePropertyDto {
  @IsNotEmpty()
  title_tm: string;

  @IsNotEmpty()
  title_ru: string;

  @IsNotEmpty()
  title_en: string;

  @IsNotEmpty()
  value_tm: string;

  @IsNotEmpty()
  value_ru: string;

  @IsNotEmpty()
  value_en: string;

  @IsIn([PropertyType.COLOR, PropertyType.PLAIN])
  type: PropertyType;

  @IsNotEmpty()
  product_id: number;
}
