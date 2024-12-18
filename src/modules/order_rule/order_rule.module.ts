import { Module } from '@nestjs/common';
import { OrderRuleService } from './order_rule.service';
import { OrderRuleController } from './order_rule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRule } from './entities/order_rule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderRule])],
  controllers: [OrderRuleController],
  providers: [OrderRuleService],
})
export class OrderRuleModule {}
