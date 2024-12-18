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
import { EmbassyRulesService } from './embassy_rules.service'; // Assuming you have an EmbassyRulesService
import { CreateEmbassyRuleDto } from './dto/create-embassy_rule.dto'; // Assuming you have this DTO
import { UpdateEmbassyRuleDto } from './dto/update-embassy_rule.dto'; // Assuming you have this DTO
import { EmbassyRule } from './entities/embassy_rule.entity'; // Assuming you have an EmbassyRule entity

@Controller('embassy-rules')
export class EmbassyRulesController {
  constructor(private readonly embassyRulesService: EmbassyRulesService) {}

  // Create a new embassy rule
  @Post()
  async create(
    @Body() createEmbassyRuleDto: CreateEmbassyRuleDto,
  ): Promise<EmbassyRule> {
    return await this.embassyRulesService.create(createEmbassyRuleDto);
  }

  // Get all embassy rules
  @Get()
  async findAll(): Promise<EmbassyRule[]> {
    return await this.embassyRulesService.findAll();
  }

  // Get a specific embassy rule by id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<EmbassyRule> {
    const ruleId = +id; // Ensure the ID is a number
    if (isNaN(ruleId)) {
      throw new NotFoundException('Embassy rule ID must be a number');
    }

    const embassyRule = await this.embassyRulesService.findOne(ruleId);
    if (!embassyRule) {
      throw new NotFoundException(`Embassy rule with ID ${ruleId} not found`);
    }
    return embassyRule;
  }

  // Update an existing embassy rule
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmbassyRuleDto: UpdateEmbassyRuleDto,
  ): Promise<EmbassyRule> {
    const ruleId = +id;
    if (isNaN(ruleId)) {
      throw new NotFoundException('Embassy rule ID must be a number');
    }

    const updatedRule = await this.embassyRulesService.update(
      ruleId,
      updateEmbassyRuleDto,
    );
    if (!updatedRule) {
      throw new NotFoundException(
        `Embassy rule with ID ${ruleId} not found for update`,
      );
    }
    return updatedRule;
  }

  // Delete an embassy rule
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    const ruleId = +id;
    if (isNaN(ruleId)) {
      throw new NotFoundException('Embassy rule ID must be a number');
    }

    try {
      await this.embassyRulesService.remove(ruleId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(
          `Embassy rule with ID ${ruleId} not found for deletion`,
        );
      }
      throw error; // Re-throw other unexpected errors
    }

    return { message: 'Embassy rule deleted successfully' };
  }
}
