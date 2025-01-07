import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePartnerDto {
  @ApiProperty({
    example: 'Banner Title in Turkmen',
    description: 'The title of the banner in Turkmen language',
  })
  @IsString()
  title_tm?: string;

  @ApiProperty({
    example: 'Banner Title in English',
    description: 'The title of the banner in English language',
  })
  @IsString()
  title_en?: string;

  @ApiProperty({
    example: 'Banner Title in Russian',
    description: 'The title of the banner in Russian language',
  })
  @IsString()
  title_ru?: string;

  @ApiProperty({
    example: 'Description of the banner in Turkmen',
    description: 'The description of the banner in Turkmen language',
  })
  @IsString()
  desc_tm?: string;

  @ApiProperty({
    example: 'Description of the banner in English',
    description: 'The description of the banner in English language',
  })
  @IsString()
  desc_en?: string;

  @ApiProperty({
    example: 'Description of the banner in Russian',
    description: 'The description of the banner in Russian language',
  })
  @IsString()
  desc_ru?: string;

  @ApiProperty({
    example: 'https://example.com/image.png',
    description: 'The URL of the banner image',
  })
  imageUrl?: string;

  @ApiProperty({
    example: '/uploads/banners/banner1.png',
    description: 'The file path of the uploaded banner image',
    required: false,
  })
  @IsOptional()
  filePath?: string;
}
