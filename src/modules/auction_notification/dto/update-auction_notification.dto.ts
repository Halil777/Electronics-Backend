import { PartialType } from '@nestjs/swagger';
import { CreateAuctionNotificationDto } from './create-auction_notification.dto';

export class UpdateAuctionNotificationDto extends PartialType(CreateAuctionNotificationDto) {}
