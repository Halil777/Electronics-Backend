import { Test, TestingModule } from '@nestjs/testing';
import { AuctionNotificationController } from './auction_notification.controller';
import { AuctionNotificationService } from './auction_notification.service';

describe('AuctionNotificationController', () => {
  let controller: AuctionNotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuctionNotificationController],
      providers: [AuctionNotificationService],
    }).compile();

    controller = module.get<AuctionNotificationController>(AuctionNotificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
