import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryRuleService } from './delivery_rule.service';
import { DeliveryRuleController } from './delivery_rule.controller';
import { DeliveryRule } from './entities/delivery_rule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryRule])],
  controllers: [DeliveryRuleController],
  providers: [DeliveryRuleService],
})
export class DeliveryRuleModule {}
