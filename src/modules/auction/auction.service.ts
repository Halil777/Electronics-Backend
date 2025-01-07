import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auction } from './entities/auction.entity';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuctionService {
  constructor(
    @InjectRepository(Auction)
    private readonly auctionRepository: Repository<Auction>,
  ) {}

  // Add a new auction
  async addAuction(body: CreateAuctionDto): Promise<Auction> {
    try {
      const auction = new Auction();
      auction.id = uuidv4();
      auction.title_tm = body.title_tm;
      auction.title_en = body.title_en;
      auction.title_ru = body.title_ru;
      auction.desc_tm = body.desc_tm;
      auction.desc_en = body.desc_en;
      auction.desc_ru = body.desc_ru;
      auction.buy_now_price = body.buy_now_price;
      auction.auction_start = body.auction_start;
      auction.auction_end = body.auction_end;
      auction.status = body.status;
      auction.min_increment = body.min_increment;

      return await this.auctionRepository.save(auction);
    } catch (err) {
      console.error(err);
      throw new BadRequestException('Failed to create an auction');
    }
  }

  // Update auction
  async updateAuction(id: string, body: UpdateAuctionDto): Promise<Auction> {
    try {
      const auction = await this.auctionRepository.findOne({ where: { id } });
      if (!auction) {
        throw new NotFoundException(`Auction with ID ${id} not found`);
      }

      auction.title_tm = body.title_tm || auction.title_tm;
      auction.title_en = body.title_en || auction.title_en;
      auction.title_ru = body.title_ru || auction.title_ru;
      auction.desc_tm = body.desc_tm || auction.desc_tm;
      auction.desc_en = body.desc_en || auction.desc_en;
      auction.desc_ru = body.desc_ru || auction.desc_ru;
      auction.buy_now_price = body.buy_now_price || auction.buy_now_price;
      auction.auction_start = body.auction_start || auction.auction_start;
      auction.auction_end = body.auction_end || auction.auction_end;
      auction.status = body.status || auction.status;
      auction.min_increment = body.min_increment || auction.min_increment;

      await this.auctionRepository.update(id, auction);
      return auction;
    } catch (err) {
      console.error(err);
      throw new BadRequestException('Failed to update auction');
    }
  }

  // Get all auctions
  async getAllAuctions(): Promise<Auction[]> {
    try {
      return await this.auctionRepository.find();
    } catch (err) {
      console.error(err);
      throw new BadRequestException('Failed to retrieve auctions');
    }
  }

  // Get a auction by ID
  async findOne(id: string): Promise<Auction> {
    try {
      const auction = await this.auctionRepository.findOne({ where: { id } });
      if (!auction) {
        throw new NotFoundException(`Auction with ID ${id} not found`);
      }

      return auction;
    } catch (err) {
      console.error(err);
      throw new BadRequestException('Failed to retrieve auction');
    }
  }

  // Delete a auction
  async deleteAuction(id: string): Promise<void> {
    try {
      const result = await this.auctionRepository.delete({ id });
      if (!result.affected) {
        throw new NotFoundException(`Auction with ID ${id} not found`);
      }
    } catch (err) {
      console.error(err);
      throw new BadRequestException('Failed to delete auction');
    }
  }
}
