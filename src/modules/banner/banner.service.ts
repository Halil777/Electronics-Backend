import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banner } from './entities/banner.entity';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner) private bannerRepository: Repository<Banner>,
  ) {}

  // Create a new banner
  async createBanner(createBannerDto: CreateBannerDto): Promise<Banner> {
    try {
      const banner = this.bannerRepository.create(createBannerDto);
      return await this.bannerRepository.save(banner);
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error);
    }
  }

  // Get a banner by ID
  async getBanner(id: number): Promise<Banner> {
    try {
      const banner = await this.bannerRepository.findOne({ where: { id } });
      if (!banner) {
        throw new NotFoundException(`Banner with ID ${id} not found`);
      }
      return banner;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error);
    }
  }

  // Update a banner
  async updateBanner(
    id: number,
    updateBannerDto: UpdateBannerDto,
  ): Promise<Banner> {
    try {
      const banner = await this.bannerRepository.findOne({ where: { id } });
      if (!banner) {
        throw new NotFoundException(`Banner with ID ${id} not found`);
      }
      // if exists update banner with data from updateBannerDto
      banner.title_tm = updateBannerDto.title_tm || banner.title_tm;
      banner.title_en = updateBannerDto.title_en || banner.title_en;
      banner.title_ru = updateBannerDto.title_ru || banner.title_ru;
      banner.desc_tm = updateBannerDto.desc_tm || banner.desc_tm;
      banner.desc_en = updateBannerDto.desc_en || banner.desc_en;
      banner.desc_ru = updateBannerDto.desc_ru || banner.desc_ru;

      await this.bannerRepository.update(id, banner);
      return banner;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error);
    }
  }

  // Update banner image
  async updateBannerImage(id: number, path: string): Promise<Banner> {
    try {
      const banner = await this.bannerRepository.findOne({ where: { id } });
      if (!banner) {
        throw new NotFoundException(`Banner with ID ${id} not found`);
      }

      banner.imageUrl = path;
      await this.bannerRepository.update(id, banner);
      return banner;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error);
    }
  }

  // Delete a banner
  async deleteBanner(id: number): Promise<void> {
    try {
      const result = await this.bannerRepository.delete({ id });
      if (!result.affected) {
        throw new NotFoundException(`Banner with ID ${id} not found`);
      }
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error);
    }
  }
  // Get all banners
  async getAllBanners(): Promise<Banner[]> {
    try {
      const banners = await this.bannerRepository.find();
      return banners.map((banner) => ({
        ...banner,
        imageUrl: process.env.BASE_URL + '/' + banner.imageUrl,
      }));
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error);
    }
  }
}
