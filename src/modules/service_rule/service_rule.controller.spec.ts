import { Test, TestingModule } from '@nestjs/testing';
import { ServiceRuleController } from './service_rule.controller';
import { ServiceRuleService } from './service_rule.service';

describe('ServiceRuleController', () => {
  let controller: ServiceRuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceRuleController],
      providers: [ServiceRuleService],
    }).compile();

    controller = module.get<ServiceRuleController>(ServiceRuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
