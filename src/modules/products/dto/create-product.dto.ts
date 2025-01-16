import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product title in Turkmen language',
    example: 'Türkmençe ady',
    required: false,
  })
  @IsOptional()
  readonly title_tm: string;

  @ApiProperty({
    description: 'Product title in Russian language',
    example: 'Русское название',
    required: false,
  })
  @IsOptional()
  readonly title_ru: string;

  @ApiProperty({
    description: 'Product title in English language',
    example: 'English title',
    required: false,
  })
  @IsOptional()
  readonly title_en: string;

  @ApiProperty({
    description: 'Product description in Turkmen language',
    example: 'Türkmençe düşündiriş',
    required: false,
  })
  @IsOptional()
  readonly desc_tm?: string;

  @ApiProperty({
    description: 'Product description in Russian language',
    example: 'Русское описание',
    required: false,
  })
  @IsOptional()
  readonly desc_ru?: string;

  @ApiProperty({
    description: 'Product description in English language',
    example: 'English description',
    required: false,
  })
  @IsOptional()
  readonly desc_en?: string;

  @ApiProperty({
    description: 'Product price',
    example: 99.99,
    required: false,
  })
  @IsOptional()
  readonly price: number;

  @ApiProperty({
    description: 'Product old price',
    example: 120.0,
    required: false,
  })
  @IsOptional()
  readonly old_price?: number;

  @ApiProperty({
    description: 'Product discount percentage',
    example: 15,
    required: false,
  })
  @IsOptional()
  readonly discount_percentage?: number;

  @ApiProperty({
    description: 'Product discounted price',
    example: 84.99,
    required: false,
  })
  @IsOptional()
  readonly discounted_price?: number;

  @ApiProperty({
    description: 'Product stock',
    example: 100,
    required: false,
  })
  @IsOptional()
  readonly stock: number;

  @ApiProperty({
    description: 'Is product active',
    example: true,
    required: false,
  })
  @IsOptional()
  readonly is_active?: boolean;

  @ApiProperty({
    description: 'Product weight in kg',
    example: 0.5,
    required: false,
  })
  @IsOptional()
  readonly weight?: number;

  @ApiProperty({
    description: 'Product width in cm',
    example: 10.5,
    required: false,
  })
  @IsOptional()
  readonly width?: number;

  @ApiProperty({
    description: 'Product height in cm',
    example: 20.0,
    required: false,
  })
  @IsOptional()
  readonly height?: number;

  @ApiProperty({
    description: 'Product depth in cm',
    example: 5.0,
    required: false,
  })
  @IsOptional()
  readonly depth?: number;

  @ApiProperty({
    description: 'Product images URLs',
    example: ['image1.jpg', 'image2.png'],
    required: false,
  })
  @IsOptional()
  readonly images?: string[];

  @ApiProperty({
    description: 'Product size',
    example: 'M',
    required: false,
  })
  @IsOptional()
  readonly size?: string;

  @ApiProperty({
    description: 'Product color',
    example: 'Red',
    required: false,
  })
  @IsOptional()
  readonly color?: string;

  @ApiProperty({
    description: 'Product tags',
    example: 'electronics, mobile',
    required: false,
  })
  @IsOptional()
  readonly tags?: string;

  @ApiProperty({
    description: 'Product views',
    example: 1000,
    required: false,
  })
  @IsOptional()
  readonly views?: number;

  @ApiProperty({
    description: 'Product rating',
    example: 4.5,
    required: false,
  })
  @IsOptional()
  readonly rating?: number;

  @ApiProperty({
    description: 'Product brand ID',
    example: 1,
    required: false,
  })
  @IsOptional()
  readonly brand_id?: number;

  @ApiProperty({
    description: 'Product category ID',
    example: 10,
    required: false,
  })
  @IsOptional()
  readonly category_id?: number; // Only one category per product now

  @ApiProperty({
    description: 'Product subcategory ID',
    example: 11,
    required: false,
  })
  @IsOptional()
  readonly subcategory_id?: number;

  @ApiProperty({
    description: 'Product segment ID',
    example: 2,
    required: false,
  })
  @IsOptional()
  readonly segment_id?: number;
}
