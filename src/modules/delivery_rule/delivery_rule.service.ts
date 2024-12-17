import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeliveryRuleDto } from './dto/create-delivery_rule.dto';
import { UpdateDeliveryRuleDto } from './dto/update-delivery_rule.dto';
import { DeliveryRule } from './entities/delivery_rule.entity'; // Assuming the entity is already defined

@Injectable()
export class DeliveryRuleService {
  constructor(
    @InjectRepository(DeliveryRule)
    private readonly deliveryRuleRepository: Repository<DeliveryRule>,
  ) {}

  // Create a new delivery rule
  async create(
    createDeliveryRuleDto: CreateDeliveryRuleDto,
  ): Promise<DeliveryRule> {
    const deliveryRule = this.deliveryRuleRepository.create(
      createDeliveryRuleDto,
    );
    return this.deliveryRuleRepository.save(deliveryRule);
  }

  // Get all delivery rules
  async findAll(): Promise<DeliveryRule[]> {
    return this.deliveryRuleRepository.find();
  }

  // Get a specific delivery rule by id
  async findOne(id: number): Promise<DeliveryRule> {
    const deliveryRule = await this.deliveryRuleRepository.findOne({
      where: { id }, // Using the 'where' option to search by ID
    });
    if (!deliveryRule) {
      throw new NotFoundException(`Delivery rule with ID ${id} not found`);
    }
    return deliveryRule;
  }

  // Update an existing delivery rule
  async update(
    id: number,
    updateDeliveryRuleDto: UpdateDeliveryRuleDto,
  ): Promise<DeliveryRule> {
    const deliveryRule = await this.deliveryRuleRepository.preload({
      id,
      ...updateDeliveryRuleDto,
    });

    if (!deliveryRule) {
      throw new NotFoundException(`Delivery rule with ID ${id} not found`);
    }

    return this.deliveryRuleRepository.save(deliveryRule);
  }

  // Delete a delivery rule
  async remove(id: number): Promise<void> {
    const deliveryRule = await this.findOne(id); // Reusing the findOne method
    await this.deliveryRuleRepository.remove(deliveryRule);
  }
}
