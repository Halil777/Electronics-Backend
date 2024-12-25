import { IsString, IsOptional, IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubcategoryDto {
  @ApiProperty({
    description: 'The title of the subcategory in Turkmen.',
    example: 'Elektronika',
  })
  @IsString()
  @IsNotEmpty()
  title_tm: string;

  @ApiProperty({
    description: 'The title of the subcategory in Russian.',
    example: 'Электроника',
  })
  @IsString()
  @IsNotEmpty()
  title_ru: string;

  @ApiProperty({
    description: 'The title of the subcategory in English.',
    example: 'Electronics',
  })
  @IsString()
  @IsNotEmpty()
  title_en: string;

  @ApiProperty({
    description: 'The optional image URL for the subcategory.',
    example: 'https://example.com/image.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    description: 'The description of the subcategory in Turkmen.',
    example: 'Türkmeňe elektronika önümleri',
    required: false,
  })
  @IsOptional()
  @IsString()
  desc_tm?: string;

  @ApiProperty({
    description: 'The description of the subcategory in Russian.',
    example: 'Туркменская электроника',
    required: false,
  })
  @IsOptional()
  @IsString()
  desc_ru?: string;

  @ApiProperty({
    description: 'The description of the subcategory in English.',
    example: 'Turkmen electronics',
    required: false,
  })
  @IsOptional()
  @IsString()
  desc_en?: string;

  @ApiProperty({
    description: 'The category ID this subcategory belongs to.',
    example: 1,
  })
  @IsInt()
  category_id: number;
}
