import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuctionNotificationDto {
  @ApiProperty({
    example: 'Türkmençe ady',
    description: 'Title in Turkmen language',
    required: false,
  })
  @IsOptional()
  title_tm?: string;

  @ApiProperty({
    example: 'English title',
    description: 'Title in English language',
    required: false,
  })
  @IsOptional()
  title_en?: string;

  @ApiProperty({
    example: 'Русское название',
    description: 'Title in Russian language',
    required: false,
  })
  @IsOptional()
  title_ru?: string;

  @ApiProperty({
    example: 'Türkmençe habary',
    description: 'Message in Turkmen language',
    required: false,
  })
  @IsOptional()
  message_tm?: string;

  @ApiProperty({
    example: 'English message',
    description: 'Message in English language',
    required: false,
  })
  @IsOptional()
  message_en?: string;

  @ApiProperty({
    example: 'Русское сообщение',
    description: 'Message in Russian language',
    required: false,
  })
  @IsOptional()
  message_ru?: string;
}
