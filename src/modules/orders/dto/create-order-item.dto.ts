import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiProperty({
    description: 'The ID of the product being ordered',
    example: 'p1b2c3d4-e5f6-7890-1234-567890abcdef',
    required: false,
  })
  @IsOptional()
  productId?: string;

  @ApiProperty({
    description: 'The quantity of the product being ordered',
    example: 2,
    required: false,
  })
  @IsOptional()
  quantity?: number;

  @ApiProperty({
    description: 'The price of the product at the time of the order',
    example: 19.99,
    required: false,
  })
  @IsOptional()
  price?: number;
}
