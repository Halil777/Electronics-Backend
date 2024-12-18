import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceRule } from './entities/service_rule.entity'; // Ensure this is the correct path
import { CreateServiceRuleDto } from './dto/create-service_rule.dto';
import { UpdateServiceRuleDto } from './dto/update-service_rule.dto';

@Injectable()
export class ServiceRuleService {
  constructor(
    @InjectRepository(ServiceRule)
    private readonly serviceRuleRepository: Repository<ServiceRule>,
  ) {}

  // Create a new service rule
  async create(
    createServiceRuleDto: CreateServiceRuleDto,
  ): Promise<ServiceRule> {
    const serviceRule = this.serviceRuleRepository.create(createServiceRuleDto);
    return await this.serviceRuleRepository.save(serviceRule);
  }

  // Get all service rules
  async findAll(): Promise<ServiceRule[]> {
    return await this.serviceRuleRepository.find();
  }

  // Get a specific service rule by id
  async findOne(id: number): Promise<ServiceRule> {
    const serviceRule = await this.serviceRuleRepository.findOne({
      where: { id }, // Specify the condition to find the rule by ID
    });

    if (!serviceRule) {
      throw new NotFoundException(`Service rule with ID ${id} not found`);
    }

    return serviceRule;
  }
  // Update an existing service rule
  async update(
    id: number,
    updateServiceRuleDto: UpdateServiceRuleDto,
  ): Promise<ServiceRule> {
    const serviceRule = await this.serviceRuleRepository.preload({
      id,
      ...updateServiceRuleDto,
    });

    if (!serviceRule) {
      throw new NotFoundException(
        `Service rule with ID ${id} not found for update`,
      );
    }
    return await this.serviceRuleRepository.save(serviceRule);
  }

  // Remove a service rule by id
  async remove(id: number): Promise<void> {
    const serviceRule = await this.findOne(id); // Reuse the findOne method for validation
    await this.serviceRuleRepository.remove(serviceRule);
  }
}
