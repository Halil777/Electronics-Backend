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
    @InjectRepository(Banner)
    private readonly bannerRepository: Repository<Banner>,
  ) {}

  // Add a new banner with an image
  async addBanner(image: string, body: CreateBannerDto): Promise<Banner> {
    try {
      const banner = new Banner();
      banner.imageUrl = image; // Use the imageUrl from the request
      banner.desc_tm = body.desc_tm;
      banner.desc_ru = body.desc_ru;
      banner.desc_en = body.desc_en;
      banner.title_tm = body.title_tm;
      banner.title_ru = body.title_ru;
      banner.title_en = body.title_en;
      return await this.bannerRepository.save(banner);
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }

  // Update banner
  async updateBanner(id: number, body: UpdateBannerDto): Promise<Banner> {
    try {
      const banner = await this.bannerRepository.findOne({ where: { id } });
      if (!banner) {
        throw new NotFoundException(`Banner with ID ${id} not found`);
      }

      banner.desc_tm = body.desc_tm || banner.desc_tm;
      banner.desc_ru = body.desc_ru || banner.desc_ru;
      banner.desc_en = body.desc_en || banner.desc_en;
      banner.title_tm = body.title_tm || banner.title_tm;
      banner.title_ru = body.title_ru || banner.title_ru;
      banner.title_en = body.title_en || banner.title_en;

      await this.bannerRepository.update(id, banner);
      return banner;
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
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
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
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
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }

  // Delete a banner
  async deleteBanner(id: number): Promise<void> {
    try {
      const result = await this.bannerRepository.delete({ id });
      if (!result.affected) {
        throw new NotFoundException(`Banner with ID ${id} not found`);
      }
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
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
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }
}
