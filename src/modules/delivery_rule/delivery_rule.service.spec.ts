import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryRuleService } from './delivery_rule.service';

describe('DeliveryRuleService', () => {
  let service: DeliveryRuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryRuleService],
    }).compile();

    service = module.get<DeliveryRuleService>(DeliveryRuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
