import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReturnRuleDto {
  @ApiProperty({
    description: 'Title in Turkmen language',
    example: 'Yük daňyşlygy düzgüni - Türkmençe',
  })
  @IsNotEmpty()
  @IsString()
  title_tm: string;

  @ApiProperty({
    description: 'Title in Russian language',
    example: 'Правила доставки - на русском',
  })
  @IsNotEmpty()
  @IsString()
  title_ru: string;

  @ApiProperty({
    description: 'Title in English language',
    example: 'Delivery rule - in English',
  })
  @IsNotEmpty()
  @IsString()
  title_en: string;

  @ApiProperty({
    description: 'Description in Turkmen language',
    example: 'Bu düzgüniň sebäbi we aýratynlyklary - Türkmençe',
  })
  @IsNotEmpty()
  @IsString()
  desc_tm: string;

  @ApiProperty({
    description: 'Description in Russian language',
    example: 'Причина и особенности правила доставки - на русском',
  })
  @IsNotEmpty()
  @IsString()
  desc_ru: string;

  @ApiProperty({
    description: 'Description in English language',
    example: 'Reason and details of the delivery rule - in English',
  })
  @IsNotEmpty()
  @IsString()
  desc_en: string;
}
