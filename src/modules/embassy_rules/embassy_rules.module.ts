import { Module } from '@nestjs/common';
import { EmbassyRulesService } from './embassy_rules.service';
import { EmbassyRulesController } from './embassy_rules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmbassyRule } from './entities/embassy_rule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmbassyRule])],
  controllers: [EmbassyRulesController],
  providers: [EmbassyRulesService],
})
export class EmbassyRulesModule {}
