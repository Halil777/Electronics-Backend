import { Test, TestingModule } from '@nestjs/testing';
import { OrderRuleService } from './order_rule.service';

describe('OrderRuleService', () => {
  let service: OrderRuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderRuleService],
    }).compile();

    service = module.get<OrderRuleService>(OrderRuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
