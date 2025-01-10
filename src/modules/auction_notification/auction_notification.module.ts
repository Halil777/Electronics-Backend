import { Module } from '@nestjs/common';
import { AuctionNotificationService } from './auction_notification.service';
import { AuctionNotificationController } from './auction_notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionNotification } from './entities/auction_notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuctionNotification])],
  controllers: [AuctionNotificationController],
  providers: [AuctionNotificationService],
})
export class AuctionNotificationModule {}
