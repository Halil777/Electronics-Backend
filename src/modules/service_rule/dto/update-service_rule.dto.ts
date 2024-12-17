import { PartialType } from '@nestjs/swagger';
import { CreateServiceRuleDto } from './create-service_rule.dto';

export class UpdateServiceRuleDto extends PartialType(CreateServiceRuleDto) {}
