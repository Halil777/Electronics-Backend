import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({
    description: 'The title of the brands in Turkmen',
    example: 'LG',
  })
  @IsString()
  @IsNotEmpty()
  title_tm: string;

  @ApiProperty({
    description: 'The title of brands in English',
    example: 'LG',
  })
  @IsString()
  @IsNotEmpty()
  title_en: string;

  @ApiProperty({
    description: 'The title of brands in russian language',
    example: 'LG',
  })
  @IsString()
  @IsNotEmpty()
  title_ru: string;

  @ApiProperty({
    description: 'The optional image URL for the brand.',
    example: 'https://example.com/image.jpg', // Example for Swagger UI
    required: false,
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({
    description: 'The description of the subcategory in Turkmen.',
    example: 'Türkmeňe elektronika önümleri', // Example for Swagger UI
    required: false,
  })
  @IsOptional()
  @IsString()
  desc_tm?: string; // Description in Turkmen

  @ApiProperty({
    description: 'The description of the subcategory in Russian.',
    example: 'Туркменская электроника', // Example for Swagger UI
    required: false,
  })
  @IsOptional()
  @IsString()
  desc_ru?: string; // Description in Russian

  @ApiProperty({
    description: 'The description of the subcategory in English.',
    example: 'Turkmen electronics', // Example for Swagger UI
    required: false,
  })
  @IsOptional()
  @IsString()
  desc_en?: string; // Description in English

  @ApiProperty({
    description: 'The category ID this subcategory belongs to.',
    example: 1,
  })
  @IsInt()
  subcategory_id: number;
}
