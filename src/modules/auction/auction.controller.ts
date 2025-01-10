import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuctionService } from './auction.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';

@Controller('auction')
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

  @Post()
  async create(@Body() createAuctionDto: CreateAuctionDto) {
    return await this.auctionService.addAuction(createAuctionDto);
  }

  @Get()
  async findAll() {
    return await this.auctionService.getAllAuctions();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.auctionService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAuctionDto: UpdateAuctionDto,
  ) {
    return await this.auctionService.updateAuction(id, updateAuctionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.auctionService.deleteAuction(id);
  }
}
