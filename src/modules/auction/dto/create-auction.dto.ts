// src/auctions/dto/create-auction.dto.ts

import { IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuctionDto {
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
    example: 'Türkmençe beýany',
    description: 'Description in Turkmen language',
    required: false,
  })
  @IsOptional()
  desc_tm?: string;

  @ApiProperty({
    example: 'English description',
    description: 'Description in English language',
    required: false,
  })
  @IsOptional()
  desc_en?: string;

  @ApiProperty({
    example: 'Русское описание',
    description: 'Description in Russian language',
    required: false,
  })
  @IsOptional()
  desc_ru?: string;

  @ApiProperty({
    example: 1500.0,
    description: 'Buy now price',
    required: false,
  })
  @IsOptional()
  buy_now_price?: number;

  @ApiProperty({
    example: '2024-12-20T10:00:00.000Z',
    description: 'Auction start date',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  auction_start?: Date;

  @ApiProperty({
    example: '2024-12-25T18:00:00.000Z',
    description: 'Auction end date',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  auction_end?: Date;

  @ApiProperty({
    example: 5,
    description: 'Minimum increment amount',
    required: false,
  })
  @IsOptional()
  min_increment?: number;

  @ApiProperty({
    example: 'pending',
    description: 'Status of the auction',
    required: false,
  })
  @IsOptional()
  status?: string;
}
