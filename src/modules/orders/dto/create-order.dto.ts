import { IsOptional, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderItemDto } from './create-order-item.dto';

export class CreateOrderDto {
  @ApiProperty({
    description: 'The ID of the user placing the order',
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    required: false,
  })
  @IsOptional()
  userId?: string;

  @ApiProperty({
    description: 'The shipping address for the order',
    example: '123 Main St, Anytown, USA',
    required: false,
  })
  @IsOptional()
  shippingAddress?: string;

  @ApiProperty({
    description: 'The billing address for the order',
    example: '456 Oak Ave, Anytown, USA',
    required: false,
  })
  @IsOptional()
  billingAddress?: string;

  @ApiProperty({
    description: 'An array of items in the order',
    type: [CreateOrderItemDto],
    required: false,
    example: [
      {
        productId: 'p1b2c3d4-e5f6-7890-1234-567890abcdef',
        quantity: 2,
        price: 19.99,
      }, // Removed id and added price to show better usage
      {
        productId: 'x1y2z3a4-b5c6-7890-1234-567890abcdef',
        quantity: 1,
        price: 29.99,
      }, // Removed id and added price to show better usage
    ],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  @ArrayMinSize(1)
  items?: CreateOrderItemDto[];
}
