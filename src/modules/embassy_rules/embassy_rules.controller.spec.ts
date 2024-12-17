import { Test, TestingModule } from '@nestjs/testing';
import { EmbassyRulesController } from './embassy_rules.controller';
import { EmbassyRulesService } from './embassy_rules.service';

describe('EmbassyRulesController', () => {
  let controller: EmbassyRulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmbassyRulesController],
      providers: [EmbassyRulesService],
    }).compile();

    controller = module.get<EmbassyRulesController>(EmbassyRulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
