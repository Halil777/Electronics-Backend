import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { AuctionNotification } from './entities/auction_notification.entity';
import { CreateAuctionNotificationDto } from './dto/create-auction_notification.dto';
import { UpdateAuctionNotificationDto } from './dto/update-auction_notification.dto';

@Injectable()
export class AuctionNotificationService {
  constructor(
    @InjectRepository(AuctionNotification)
    private readonly notificationRepository: Repository<AuctionNotification>,
  ) {}

  // Add a new auction notification
  async addNotification(
    body: CreateAuctionNotificationDto,
  ): Promise<AuctionNotification> {
    try {
      const notification = new AuctionNotification();
      notification.id = uuidv4();
      notification.title_tm = body.title_tm;
      notification.title_en = body.title_en;
      notification.title_ru = body.title_ru;
      notification.message_tm = body.message_tm;
      notification.message_en = body.message_en;
      notification.message_ru = body.message_ru;

      return await this.notificationRepository.save(notification);
    } catch (err) {
      console.error(err);
      throw new BadRequestException('Failed to create notification');
    }
  }

  // Update auction notification
  async updateNotification(
    id: string,
    body: UpdateAuctionNotificationDto,
  ): Promise<AuctionNotification> {
    try {
      const notification = await this.notificationRepository.findOne({
        where: { id },
      });
      if (!notification) {
        throw new NotFoundException(`Notification with ID ${id} not found`);
      }

      notification.title_tm = body.title_tm || notification.title_tm;
      notification.title_en = body.title_en || notification.title_en;
      notification.title_ru = body.title_ru || notification.title_ru;
      notification.message_tm = body.message_tm || notification.message_tm;
      notification.message_en = body.message_en || notification.message_en;
      notification.message_ru = body.message_ru || notification.message_ru;

      await this.notificationRepository.update(id, notification);
      return notification;
    } catch (err) {
      console.error(err);
      throw new BadRequestException('Failed to update notification');
    }
  }

  // Get all auction notifications
  async getAllNotifications(): Promise<AuctionNotification[]> {
    try {
      return await this.notificationRepository.find();
    } catch (err) {
      console.error(err);
      throw new BadRequestException('Failed to retrieve notifications');
    }
  }

  // Get a single auction notification by ID
  async findOne(id: string): Promise<AuctionNotification> {
    try {
      const notification = await this.notificationRepository.findOne({
        where: { id },
      });
      if (!notification) {
        throw new NotFoundException(`Notification with ID ${id} not found`);
      }
      return notification;
    } catch (err) {
      console.error(err);
      throw new BadRequestException('Failed to retrieve notification');
    }
  }

  // Delete an auction notification by ID
  async deleteNotification(id: string): Promise<void> {
    try {
      const result = await this.notificationRepository.delete({ id });
      if (!result.affected) {
        throw new NotFoundException(`Notification with ID ${id} not found`);
      }
    } catch (err) {
      console.error(err);
      throw new BadRequestException('Failed to delete notification');
    }
  }
}
