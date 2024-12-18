import { Test, TestingModule } from '@nestjs/testing';
import { OrderRuleController } from './order_rule.controller';
import { OrderRuleService } from './order_rule.service';

describe('OrderRuleController', () => {
  let controller: OrderRuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderRuleController],
      providers: [OrderRuleService],
    }).compile();

    controller = module.get<OrderRuleController>(OrderRuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
