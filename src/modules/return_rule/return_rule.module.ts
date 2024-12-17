import { Module } from '@nestjs/common';
import { ReturnRuleService } from './return_rule.service';
import { ReturnRuleController } from './return_rule.controller';
import { ReturnRule } from './entities/return_rule.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ReturnRule])],
  controllers: [ReturnRuleController],
  providers: [ReturnRuleService],
})
export class ReturnRuleModule {}
