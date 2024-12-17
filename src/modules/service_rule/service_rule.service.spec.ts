import { Test, TestingModule } from '@nestjs/testing';
import { ServiceRuleService } from './service_rule.service';

describe('ServiceRuleService', () => {
  let service: ServiceRuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceRuleService],
    }).compile();

    service = module.get<ServiceRuleService>(ServiceRuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
