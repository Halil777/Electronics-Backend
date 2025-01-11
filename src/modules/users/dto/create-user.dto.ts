import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiPropertyOptional({
    example: 'John',
    description: 'First name of the user',
  })
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional({ example: 'Doe', description: 'Last name of the user' })
  @IsOptional()
  lastName?: string;

  @ApiPropertyOptional({
    example: 'john.doe@example.com',
    description: 'Email address of the user',
  })
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    example: '+1234567890',
    description: 'Phone number of the user',
  })
  @IsOptional()
  phoneNumber?: string;

  @ApiPropertyOptional({
    example: 'true',
    description: 'Bildirish almalymy',
  })
  @IsOptional()
  isNotify?: boolean | false;

  @ApiPropertyOptional({
    example: 'securePassword123',
    description: 'Password for the user account',
  })
  @IsOptional()
  password?: string;
}
