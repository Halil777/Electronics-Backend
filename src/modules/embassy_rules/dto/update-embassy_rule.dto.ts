import { PartialType } from '@nestjs/swagger';
import { CreateEmbassyRuleDto } from './create-embassy_rule.dto';

export class UpdateEmbassyRuleDto extends PartialType(CreateEmbassyRuleDto) {}
