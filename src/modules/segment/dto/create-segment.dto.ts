import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSegmentDto {
  @ApiProperty({
    description: 'The title of the segment in Turkmen.',
    example: 'Elektronika',
  })
  @IsString()
  @IsNotEmpty()
  title_tm: string;

  @ApiProperty({
    description: 'The title of the segment in Russian.',
    example: 'Электроника',
  })
  @IsString()
  @IsNotEmpty()
  title_ru: string;

  @ApiProperty({
    description: 'The title of the segment in English.',
    example: 'Electronics',
  })
  @IsString()
  @IsNotEmpty()
  title_en: string;

  @ApiProperty({
    description: 'The optional image URL for the segment.',
    example: 'https://example.com/image.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    description: 'The description of the segment in Turkmen.',
    example: 'Türkmeňe elektronika önümleri',
    required: false,
  })
  @IsOptional()
  @IsString()
  desc_tm?: string;

  @ApiProperty({
    description: 'The description of the segment in Russian.',
    example: 'Туркменская электроника',
    required: false,
  })
  @IsOptional()
  @IsString()
  desc_ru?: string;

  @ApiProperty({
    description: 'The description of the segment in English.',
    example: 'Turkmen electronics',
    required: false,
  })
  @IsOptional()
  @IsString()
  desc_en?: string;

  @ApiProperty({
    description: 'The subcategory ID this segment belongs to.',
    example: 1,
  })
  subcategory_id: number;
}
