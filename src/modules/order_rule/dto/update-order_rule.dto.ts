import { PartialType } from '@nestjs/swagger';
import { CreateOrderRuleDto } from './create-order_rule.dto';

export class UpdateOrderRuleDto extends PartialType(CreateOrderRuleDto) {}
