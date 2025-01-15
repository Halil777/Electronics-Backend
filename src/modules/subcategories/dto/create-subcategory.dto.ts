import { IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubcategoryDto {
  @ApiProperty({
    description: 'The title of the subcategory in Turkmen.',
    example: 'Elektronika',
  })
  @IsOptional()
  title_tm: string;

  @ApiProperty({
    description: 'The title of the subcategory in Russian.',
    example: 'Электроника',
  })
  @IsOptional()
  title_ru: string;

  @ApiProperty({
    description: 'The title of the subcategory in English.',
    example: 'Electronics',
  })
  @IsOptional()
  title_en: string;

  @ApiProperty({
    description: 'The optional image URL for the subcategory.',
    example: 'https://example.com/image.jpg',
    required: false,
  })
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({
    description: 'The description of the subcategory in Turkmen.',
    example: 'Türkmeňe elektronika önümleri',
    required: false,
  })
  @IsOptional()
  desc_tm?: string;

  @ApiProperty({
    description: 'The description of the subcategory in Russian.',
    example: 'Туркменская электроника',
    required: false,
  })
  @IsOptional()
  desc_ru?: string;

  @ApiProperty({
    description: 'The description of the subcategory in English.',
    example: 'Turkmen electronics',
    required: false,
  })
  @IsOptional()
  desc_en?: string;

  @ApiProperty({
    description: 'The category ID this subcategory belongs to.',
    example: 1,
  })
  category_id: number;
}
