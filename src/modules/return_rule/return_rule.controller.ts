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
import { ReturnRuleService } from './return_rule.service';
import { CreateReturnRuleDto } from './dto/create-return_rule.dto';
import { UpdateReturnRuleDto } from './dto/update-return_rule.dto';

@Controller('return-rule')
export class ReturnRuleController {
  constructor(private readonly returnRuleService: ReturnRuleService) {}

  @Post()
  async create(@Body() createReturnRuleDto: CreateReturnRuleDto) {
    return await this.returnRuleService.create(createReturnRuleDto);
  }

  @Get()
  async findAll() {
    return await this.returnRuleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const ruleId = +id;
    if (isNaN(ruleId)) {
      throw new NotFoundException('Delivery rule ID must be a number');
    }

    const deliveryRule = await this.returnRuleService.findOne(ruleId);
    if (!deliveryRule) {
      throw new NotFoundException(`Delivery rule with ID ${ruleId} not found`);
    }
    return deliveryRule;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReturnRuleDto: UpdateReturnRuleDto,
  ) {
    const ruleId = +id;
    if (isNaN(ruleId)) {
      throw new NotFoundException('Delivery rule ID must be a number');
    }

    const updatedRule = await this.returnRuleService.update(
      ruleId,
      updateReturnRuleDto,
    );
    if (!updatedRule) {
      throw new NotFoundException(
        `Delivery rule with ID ${ruleId} not found for update`,
      );
    }
    return updatedRule;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const ruleId = +id;
    if (isNaN(ruleId)) {
      throw new NotFoundException('Delivery rule ID must be a number');
    }

    try {
      await this.returnRuleService.remove(ruleId);
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
