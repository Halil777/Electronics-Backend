import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { DeliveryRuleService } from './delivery_rule.service';
import { CreateDeliveryRuleDto } from './dto/create-delivery_rule.dto';
import { UpdateDeliveryRuleDto } from './dto/update-delivery_rule.dto';

@Controller('delivery-rule')
export class DeliveryRuleController {
  constructor(private readonly deliveryRuleService: DeliveryRuleService) {}

  // Create a new delivery rule
  @Post()
  async create(@Body() createDeliveryRuleDto: CreateDeliveryRuleDto) {
    return await this.deliveryRuleService.create(createDeliveryRuleDto);
  }

  // Get all delivery rules
  @Get()
  async findAll() {
    return await this.deliveryRuleService.findAll();
  }

  // Get a specific delivery rule by id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const ruleId = +id; // Ensure the ID is a number
    if (isNaN(ruleId)) {
      throw new NotFoundException('Delivery rule ID must be a number');
    }

    const deliveryRule = await this.deliveryRuleService.findOne(ruleId);
    if (!deliveryRule) {
      throw new NotFoundException(`Delivery rule with ID ${ruleId} not found`);
    }
    return deliveryRule;
  }

  // Update an existing delivery rule
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDeliveryRuleDto: UpdateDeliveryRuleDto,
  ) {
    const ruleId = +id;
    if (isNaN(ruleId)) {
      throw new NotFoundException('Delivery rule ID must be a number');
    }

    const updatedRule = await this.deliveryRuleService.update(
      ruleId,
      updateDeliveryRuleDto,
    );
    if (!updatedRule) {
      throw new NotFoundException(
        `Delivery rule with ID ${ruleId} not found for update`,
      );
    }
    return updatedRule;
  }

  // Delete a delivery rule
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const ruleId = +id;
    if (isNaN(ruleId)) {
      throw new NotFoundException('Delivery rule ID must be a number');
    }

    try {
      await this.deliveryRuleService.remove(ruleId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(
          `Delivery rule with ID ${ruleId} not found for deletion`,
        );
      }
      throw error; // Re-throw other unexpected errors
    }

    return { message: 'Delivery rule deleted successfully' };
  }
}
