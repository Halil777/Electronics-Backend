import { IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsOptional()
  readonly title_tm: string;

  @IsOptional()
  readonly title_ru: string;

  @IsOptional()
  readonly title_en: string;

  @IsOptional()
  readonly desc_tm?: string;

  @IsOptional()
  readonly desc_ru?: string;

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

  @IsOptional()
  readonly images?: string[];

  @IsOptional()
  readonly size?: string;

  @IsOptional()
  readonly color?: string;

  @IsOptional()
  readonly tags?: string;

  @IsOptional()
  readonly views?: number;

  @IsOptional()
  readonly rating?: number;

  // Relationships
  @IsOptional()
  readonly brand_id?: number;

  // Update category relationship to only one category (not an array)
  @IsOptional()
  readonly category_id?: number; // Only one category per product now

  @IsOptional()
  readonly segment_id?: number;
}
