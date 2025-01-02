import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  IsInt,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly title_tm: string;

  @IsString()
  readonly title_ru: string;

  @IsString()
  readonly title_en: string;

  @IsString()
  @IsOptional()
  readonly desc_tm?: string;

  @IsString()
  @IsOptional()
  readonly desc_ru?: string;

  @IsString()
  @IsOptional()
  readonly desc_en?: string;

  @IsOptional()
  readonly price: number;

  @IsOptional()
  readonly old_price?: number;

  @IsOptional()
  readonly discount_percentage?: number;

  @IsOptional()
  readonly discounted_price?: number;

  @IsOptional()
  readonly stock: number;

  @IsBoolean()
  @IsOptional()
  readonly is_active?: boolean;

  @IsOptional()
  readonly weight?: number;

  @IsOptional()
  readonly width?: number;

  @IsOptional()
  readonly height?: number;

  @IsOptional()
  readonly depth?: number;

  @IsArray()
  @IsOptional()
  readonly images?: string[];

  @IsString()
  @IsOptional()
  readonly size?: string;

  @IsString()
  @IsOptional()
  readonly color?: string;

  @IsString()
  @IsOptional()
  readonly tags?: string;

  @IsInt()
  @IsOptional()
  readonly views?: number;

  @IsOptional()
  readonly rating?: number;

  // Relationships
  @IsInt()
  @IsOptional()
  readonly brand_id?: number;

  @IsArray()
  @IsOptional()
  @IsInt({ each: true }) // Проверяем, что каждый элемент — это ID категории
  readonly categories?: number[];

  @IsInt()
  @IsOptional()
  readonly segment_id?: number;
}
