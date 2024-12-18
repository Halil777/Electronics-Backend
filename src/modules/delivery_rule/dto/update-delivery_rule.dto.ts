import { PartialType } from '@nestjs/swagger';
import { CreateDeliveryRuleDto } from './create-delivery_rule.dto';

export class UpdateDeliveryRuleDto extends PartialType(CreateDeliveryRuleDto) {}
