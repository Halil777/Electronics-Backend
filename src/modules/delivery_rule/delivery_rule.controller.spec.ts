import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryRuleController } from './delivery_rule.controller';
import { DeliveryRuleService } from './delivery_rule.service';

describe('DeliveryRuleController', () => {
  let controller: DeliveryRuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryRuleController],
      providers: [DeliveryRuleService],
    }).compile();

    controller = module.get<DeliveryRuleController>(DeliveryRuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
