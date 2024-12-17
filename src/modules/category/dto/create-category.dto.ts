import { IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  title_tm: string;

  @IsString()
  title_ru: string;

  @IsString()
  title_en: string;

  @IsOptional()
  @IsString()
  desc_tm?: string;

  @IsOptional()
  @IsString()
  desc_ru?: string;

  @IsOptional()
  @IsString()
  desc_en?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  filePath?: string; // Add this field to handle the file path
}
