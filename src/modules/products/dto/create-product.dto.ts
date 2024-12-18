import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 129.99,
    description: 'Старая цена продукта (для отображения скидки)',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  old_price?: number;

  @ApiProperty({
    example: 10,
    description: 'Процент скидки на продукт',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  discount_percentage?: number;

  @ApiProperty({
    example: 89.99,
    description: 'Цена со скидкой (если рассчитывается заранее)',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  discounted_price?: number;

  @ApiProperty({
    example: 50,
    description: 'Количество товара на складе',
  })
  @IsNumber()
  @IsNotEmpty()
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
  @IsNumber()
  @IsOptional()
  weight?: number;

  @ApiProperty({
    example: '/images/product1.jpg',
    description: 'Основное изображение продукта',
    required: false,
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({
    example: '/images/gallery1.jpg,/images/gallery2.jpg',
    description: 'Список дополнительных изображений продукта',
    required: false,
  })
  @IsString()
  @IsOptional()
  images?: string;

  @ApiProperty({
    example: 0,
    description: 'Количество просмотров продукта',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  views?: number;

  @ApiProperty({
    example: 4.5,
    description: 'Рейтинг продукта от пользователей (1-5)',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  rating?: number;

  @ApiProperty({
    example: 1,
    description: 'Идентификатор бренда, к которому относится продукт',
  })
  @IsNumber()
  @IsNotEmpty()
  brand_id: number;
}
