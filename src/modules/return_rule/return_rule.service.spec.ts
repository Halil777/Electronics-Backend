import { Test, TestingModule } from '@nestjs/testing';
import { ReturnRuleService } from './return_rule.service';

describe('ReturnRuleService', () => {
  let service: ReturnRuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReturnRuleService],
    }).compile();

    service = module.get<ReturnRuleService>(ReturnRuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
