import { Test, TestingModule } from '@nestjs/testing';
import { EmbassyRulesService } from './embassy_rules.service';

describe('EmbassyRulesService', () => {
  let service: EmbassyRulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmbassyRulesService],
    }).compile();

    service = module.get<EmbassyRulesService>(EmbassyRulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
