import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ImageDto {
  @ApiProperty({
    example: 'https://example.com/image1.jpg',
    description: 'URL of the product image',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    example: 'Product Image',
    description: 'Alternative text for the image',
    required: false,
  })
  @IsString()
  @IsOptional()
  alt_text?: string;

  @ApiProperty({
    example: true,
    description: 'Is this main image',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  is_main?: boolean;
}

export class CreateProductDto {
  @ApiProperty({
    example: 'Название продукта на туркменском',
    description: 'Название продукта на туркменском языке',
  })
  @IsString()
  @IsNotEmpty()
  title_tm: string;

  @ApiProperty({
    example: 'Название продукта на русском',
    description: 'Название продукта на русском языке',
  })
  @IsString()
  @IsNotEmpty()
  title_ru: string;

  @ApiProperty({
    example: 'Product title in English',
    description: 'Название продукта на английском языке',
  })
  @IsString()
  @IsNotEmpty()
  title_en: string;

  @ApiProperty({
    example: 'Описание продукта на туркменском',
    description: 'Описание продукта на туркменском языке',
    required: false,
  })
  @IsString()
  @IsOptional()
  desc_tm?: string;

  @ApiProperty({
    example: 'Описание продукта на русском',
    description: 'Описание продукта на русском языке',
    required: false,
  })
  @IsString()
  @IsOptional()
  desc_ru?: string;

  @ApiProperty({
    example: 'Product description in English',
    description: 'Описание продукта на английском языке',
    required: false,
  })
  @IsString()
  @IsOptional()
  desc_en?: string;

  @ApiProperty({
    example: 99.99,
    description: 'Цена продукта',
  })
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 129.99,
    description: 'Старая цена продукта (для отображения скидки)',
    required: false,
  })
  @IsOptional()
  old_price?: number;

  @ApiProperty({
    example: 10,
    description: 'Процент скидки на продукт',
    required: false,
  })
  @IsOptional()
  discount_percentage?: number;

  @ApiProperty({
    example: 89.99,
    description: 'Цена со скидкой (если рассчитывается заранее)',
    required: false,
  })
  @IsOptional()
  discounted_price?: number;

  @ApiProperty({
    example: 50,
    description: 'Количество товара на складе',
  })
  stock: number;

  @ApiProperty({
    example: 'PROD12345',
    description: 'Уникальный код продукта (SKU)',
    required: false,
  })
  @IsString()
  @IsOptional()
  sku?: string;

  @ApiProperty({
    example: true,
    description: 'Активность продукта (доступен для продажи или нет)',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @ApiProperty({
    example: 1.5,
    description: 'Вес продукта в килограммах',
    required: false,
  })
  @IsOptional()
  weight?: number;

  @ApiProperty({
    example: [
      {
        url: 'https://example.com/image1.jpg',
        alt_text: 'Product Image',
        is_main: true,
      },
      {
        url: 'https://example.com/image2.jpg',
        alt_text: 'Product Image 2',
      },
    ],
    description: 'Images of the product with details',
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  @IsOptional()
  images?: ImageDto[];

  @ApiProperty({
    example: 'Small',
    description: 'Size of product',
    required: false,
  })
  @IsString()
  @IsOptional()
  size?: string;

  @ApiProperty({
    example: 'Red',
    description: 'Color of product',
    required: false,
  })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiProperty({
    example: ['Tag1', 'Tag2'],
    description: 'Tags of product',
    required: false,
  })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiProperty({
    example: 'https://example.com/product-video.mp4',
    description: 'Video URL of product',
    required: false,
  })
  @IsString()
  @IsOptional()
  video_url?: string;

  @ApiProperty({
    example: 0,
    description: 'Количество просмотров продукта',
    required: false,
  })
  @IsOptional()
  views?: number;

  @ApiProperty({
    example: 4.5,
    description: 'Рейтинг продукта от пользователей (1-5)',
    required: false,
  })
  @IsOptional()
  rating?: number;

  @ApiProperty({
    example: 1,
    description: 'Идентификатор бренда, к которому относится продукт',
    required: false,
  })
  @IsOptional()
  brand_id?: number;
}
