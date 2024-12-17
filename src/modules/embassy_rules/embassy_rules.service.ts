import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmbassyRule } from './entities/embassy_rule.entity';
import { CreateEmbassyRuleDto } from './dto/create-embassy_rule.dto';
import { UpdateEmbassyRuleDto } from './dto/update-embassy_rule.dto';

@Injectable()
export class EmbassyRulesService {
  constructor(
    @InjectRepository(EmbassyRule)
    private readonly embassyRuleRepository: Repository<EmbassyRule>, // TypeORM repository
  ) {}

  async create(
    createEmbassyRuleDto: CreateEmbassyRuleDto,
  ): Promise<EmbassyRule> {
    const embassyRule = this.embassyRuleRepository.create(createEmbassyRuleDto);
    return this.embassyRuleRepository.save(embassyRule);
  }

  async findAll(): Promise<EmbassyRule[]> {
    return this.embassyRuleRepository.find();
  }

  async findOne(id: number): Promise<EmbassyRule> {
    // Updated the findOne method to use an options object
    const embassyRule = await this.embassyRuleRepository.findOne({
      where: { id }, // Specify the condition to find by id
    });
    if (!embassyRule) {
      throw new NotFoundException(`Embassy rule with ID ${id} not found`);
    }
    return embassyRule;
  }

  async update(
    id: number,
    updateEmbassyRuleDto: UpdateEmbassyRuleDto,
  ): Promise<EmbassyRule> {
    const embassyRule = await this.embassyRuleRepository.preload({
      id,
      ...updateEmbassyRuleDto,
    });
    if (!embassyRule) {
      throw new NotFoundException(`Embassy rule with ID ${id} not found`);
    }
    return this.embassyRuleRepository.save(embassyRule);
  }

  async remove(id: number): Promise<void> {
    const embassyRule = await this.findOne(id);
    await this.embassyRuleRepository.remove(embassyRule);
  }
}
