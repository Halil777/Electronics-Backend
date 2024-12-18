import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReturnRuleDto } from './dto/create-return_rule.dto';
import { UpdateReturnRuleDto } from './dto/update-return_rule.dto';
import { ReturnRule } from './entities/return_rule.entity'; // Assuming this is your entity
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReturnRuleService {
  constructor(
    @InjectRepository(ReturnRule)
    private readonly returnRuleRepository: Repository<ReturnRule>,
  ) {}

  // Create a new return rule
  async create(createReturnRuleDto: CreateReturnRuleDto): Promise<ReturnRule> {
    const newReturnRule = this.returnRuleRepository.create(createReturnRuleDto);
    return await this.returnRuleRepository.save(newReturnRule);
  }

  // Get all return rules
  async findAll(): Promise<ReturnRule[]> {
    return await this.returnRuleRepository.find();
  }

  // Get a specific return rule by ID
  async findOne(id: number): Promise<ReturnRule> {
    const returnRule = await this.returnRuleRepository.findOne({
      where: { id },
    });
    if (!returnRule) {
      throw new NotFoundException(`Return rule with ID ${id} not found`);
    }
    return returnRule;
  }

  // Update an existing return rule
  async update(
    id: number,
    updateReturnRuleDto: UpdateReturnRuleDto,
  ): Promise<ReturnRule> {
    const returnRule = await this.findOne(id); // Ensure the rule exists
    Object.assign(returnRule, updateReturnRuleDto); // Merge updated properties
    return await this.returnRuleRepository.save(returnRule);
  }

  // Delete a return rule by ID
  async remove(id: number): Promise<void> {
    const returnRule = await this.findOne(id); // Ensure the rule exists
    await this.returnRuleRepository.remove(returnRule); // Delete the rule
  }
}
