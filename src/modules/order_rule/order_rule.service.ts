import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderRuleDto } from './dto/create-order_rule.dto';
import { UpdateOrderRuleDto } from './dto/update-order_rule.dto';
import { OrderRule } from './entities/order_rule.entity'; // Assume you have this entity defined

@Injectable()
export class OrderRuleService {
  constructor(
    @InjectRepository(OrderRule)
    private orderRuleRepository: Repository<OrderRule>,
  ) {}

  async create(createOrderRuleDto: CreateOrderRuleDto) {
    const orderRule = this.orderRuleRepository.create(createOrderRuleDto);
    return await this.orderRuleRepository.save(orderRule);
  }

  async findAll() {
    return await this.orderRuleRepository.find();
  }

  async findOne(id: number) {
    const orderRule = await this.orderRuleRepository.findOne({ where: { id } });
    if (!orderRule) {
      throw new Error(`Order rule with ID ${id} not found`);
    }
    return orderRule;
  }

  async update(id: number, updateOrderRuleDto: UpdateOrderRuleDto) {
    const orderRule = await this.orderRuleRepository.findOne({ where: { id } });
    if (!orderRule) {
      throw new Error(`Order rule with ID ${id} not found`);
    }

    Object.assign(orderRule, updateOrderRuleDto);
    return await this.orderRuleRepository.save(orderRule);
  }

  async remove(id: number) {
    const orderRule = await this.orderRuleRepository.findOne({ where: { id } });
    if (!orderRule) {
      throw new Error(`Order rule with ID ${id} not found`);
    }
    await this.orderRuleRepository.remove(orderRule);
    return { message: 'Order rule deleted successfully' };
  }
}
