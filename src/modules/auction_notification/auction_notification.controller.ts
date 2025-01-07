import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuctionNotificationService } from './auction_notification.service';
import { CreateAuctionNotificationDto } from './dto/create-auction_notification.dto';
import { UpdateAuctionNotificationDto } from './dto/update-auction_notification.dto';

@Controller('auction-notification')
export class AuctionNotificationController {
  constructor(
    private readonly auctionNotificationService: AuctionNotificationService,
  ) {}

  @Post()
  async create(
    @Body() createAuctionNotificationDto: CreateAuctionNotificationDto,
  ) {
    return await this.auctionNotificationService.addNotification(
      createAuctionNotificationDto,
    );
  }

  @Get()
  async findAll() {
    return await this.auctionNotificationService.getAllNotifications();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.auctionNotificationService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAuctionNotificationDto: UpdateAuctionNotificationDto,
  ) {
    return await this.auctionNotificationService.updateNotification(
      id,
      updateAuctionNotificationDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.auctionNotificationService.deleteNotification(id);
  }
}
