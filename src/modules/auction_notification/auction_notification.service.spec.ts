import { Test, TestingModule } from '@nestjs/testing';
import { AuctionNotificationService } from './auction_notification.service';

describe('AuctionNotificationService', () => {
  let service: AuctionNotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuctionNotificationService],
    }).compile();

    service = module.get<AuctionNotificationService>(AuctionNotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
