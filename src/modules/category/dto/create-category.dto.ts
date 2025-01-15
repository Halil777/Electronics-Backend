import { IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsOptional()
  title_tm: string;

  @IsOptional()
  title_ru: string;

  @IsOptional()
  title_en: string;

  @IsOptional()
  desc_tm?: string;

  @IsOptional()
  desc_ru?: string;

  @IsOptional()
  desc_en?: string;

  @IsOptional()
  imageUrl?: string;

  @IsOptional()
  filePath?: string;
}
