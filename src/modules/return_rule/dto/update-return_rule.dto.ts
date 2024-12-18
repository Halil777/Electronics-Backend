import { PartialType } from '@nestjs/swagger';
import { CreateReturnRuleDto } from './create-return_rule.dto';

export class UpdateReturnRuleDto extends PartialType(CreateReturnRuleDto) {}
