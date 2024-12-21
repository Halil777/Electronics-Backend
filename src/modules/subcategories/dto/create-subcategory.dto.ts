import { IsString, IsOptional, IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubcategoryDto {
  @ApiProperty({
    description: 'The title of the subcategory in Turkmen.',
    example: 'Elektronika', // Example for Swagger UI
  })
  @IsString()
  @IsNotEmpty()
  title_tm: string; // Title in Turkmen

  @ApiProperty({
    description: 'The title of the subcategory in Russian.',
    example: 'Электроника', // Example for Swagger UI
  })
  @IsString()
  @IsNotEmpty()
  title_ru: string; // Title in Russian

  @ApiProperty({
    description: 'The title of the subcategory in English.',
    example: 'Electronics', // Example for Swagger UI
  })
  @IsString()
  @IsNotEmpty()
  title_en: string; // Title in English

  @ApiProperty({
    description: 'The optional image URL for the subcategory.',
    example: 'https://example.com/image.jpg', // Example for Swagger UI
    required: false,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string; // Optional image URL

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
    example: 1, // Example for Swagger UI
  })
  @IsInt()
  category_id: number; // Foreign key to the category
}
