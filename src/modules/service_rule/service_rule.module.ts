import { Module } from '@nestjs/common';
import { ServiceRuleService } from './service_rule.service';
import { ServiceRuleController } from './service_rule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceRule } from './entities/service_rule.entity'; // Assuming an entity is created

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceRule]), // Importing ServiceRule entity if you are using TypeORM for DB interaction
  ],
  controllers: [ServiceRuleController],
  providers: [ServiceRuleService],
})
export class ServiceRuleModule {}
