import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBannerDto {
  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @IsOptional()
  @IsString()
  title_tm?: string;

  @IsOptional()
  @IsString()
  title_en?: string;

  @IsOptional()
  @IsString()
  title_ru?: string;

  @IsOptional()
  @IsString()
  desc_tm?: string;

  @IsOptional()
  @IsString()
  desc_en?: string;

  @IsOptional()
  @IsString()
  desc_ru?: string;
}
