import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderRuleService } from './order_rule.service';
import { CreateOrderRuleDto } from './dto/create-order_rule.dto';
import { UpdateOrderRuleDto } from './dto/update-order_rule.dto';

@ApiTags('Order Rules')
@Controller('order-rule')
export class OrderRuleController {
  constructor(private readonly orderRuleService: OrderRuleService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order rule' })
  @ApiResponse({
    status: 201,
    description: 'The order rule has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data sent for creating the order rule.',
  })
  async create(@Body() createOrderRuleDto: CreateOrderRuleDto) {
    return await this.orderRuleService.create(createOrderRuleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all order rules' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched all order rules.',
  })
  async findAll() {
    return await this.orderRuleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific order rule by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched the order rule.',
  })
  @ApiResponse({
    status: 404,
    description: 'Order rule with the provided ID not found.',
  })
  async findOne(@Param('id') id: string) {
    const ruleId = Number(id); // Ensure the ID is a number
    if (isNaN(ruleId)) {
      throw new BadRequestException('The ID must be a valid number.');
    }

    const orderRule = await this.orderRuleService.findOne(ruleId);
    if (!orderRule) {
      throw new NotFoundException(`Order rule with ID ${ruleId} not found`);
    }
    return orderRule;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing order rule' })
  @ApiResponse({
    status: 200,
    description: 'The order rule has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Order rule with the provided ID not found for update.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateOrderRuleDto: UpdateOrderRuleDto,
  ) {
    const ruleId = Number(id);
    if (isNaN(ruleId)) {
      throw new BadRequestException('The ID must be a valid number.');
    }

    const updatedRule = await this.orderRuleService.update(
      ruleId,
      updateOrderRuleDto,
    );
    if (!updatedRule) {
      throw new NotFoundException(
        `Order rule with ID ${ruleId} not found for update`,
      );
    }
    return updatedRule;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order rule by ID' })
  @ApiResponse({
    status: 200,
    description: 'The order rule has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Order rule with the provided ID not found for deletion.',
  })
  async remove(@Param('id') id: string) {
    const ruleId = Number(id);
    if (isNaN(ruleId)) {
      throw new BadRequestException('The ID must be a valid number.');
    }

    const removedRule = await this.orderRuleService.remove(ruleId);
    if (!removedRule) {
      throw new NotFoundException(
        `Order rule with ID ${ruleId} not found for deletion`,
      );
    }
    return { message: 'Order rule deleted successfully' };
  }
}
