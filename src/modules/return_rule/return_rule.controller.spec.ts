import { Test, TestingModule } from '@nestjs/testing';
import { ReturnRuleController } from './return_rule.controller';
import { ReturnRuleService } from './return_rule.service';

describe('ReturnRuleController', () => {
  let controller: ReturnRuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReturnRuleController],
      providers: [ReturnRuleService],
    }).compile();

    controller = module.get<ReturnRuleController>(ReturnRuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
