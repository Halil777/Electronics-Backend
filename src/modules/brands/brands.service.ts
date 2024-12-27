import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandsRepository: Repository<Brand>,
  ) {}

  // Create brand with image path
  async create(image: string, body: CreateBrandDto): Promise<Brand> {
    try {
      const brand = new Brand();
      brand.imageUrl = image;
      brand.desc_tm = body.desc_tm;
      brand.desc_ru = body.desc_ru;
      brand.desc_en = body.desc_en;
      brand.title_tm = body.title_tm;
      brand.title_ru = body.title_ru;
      brand.title_en = body.title_en;
      return await this.brandsRepository.save(brand);
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }

  // Update brand
  async update(id: number, body: UpdateBrandDto): Promise<Brand> {
    try {
      const brand = await this.brandsRepository.findOne({ where: { id } });
      if (!brand) {
        throw new NotFoundException(`Brand with ID ${id} not found`);
      }

      brand.desc_tm = body.desc_tm || brand.desc_tm;
      brand.desc_ru = body.desc_ru || brand.desc_ru;
      brand.desc_en = body.desc_en || brand.desc_en;
      brand.title_tm = body.title_tm || brand.title_tm;
      brand.title_ru = body.title_ru || brand.title_ru;
      brand.title_en = body.title_en || brand.title_en;

      await this.brandsRepository.update(id, brand);
      return brand;
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }

  // Get all brands
  async findAll(): Promise<Brand[]> {
    try {
      const brands = await this.brandsRepository.find();
      return brands.map((brand) => ({
        ...brand,
        imageUrl: process.env.BASE_URL + '/' + brand.imageUrl,
      }));
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }

  // Get a brand by its ID
  async findOne(id: number): Promise<Brand> {
    try {
      const brand = await this.brandsRepository.findOne({ where: { id } });
      if (!brand) {
        throw new NotFoundException(`Brand with ID ${id} not found`);
      }
      return brand;
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }

  // Delete a brand by its ID
  async remove(id: number): Promise<void> {
    try {
      const result = await this.brandsRepository.delete({ id });
      if (!result.affected) {
        throw new NotFoundException(`Brand with ID ${id} not found`);
      }
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }

  // Update brand image
  async updateBrandImage(id: number, path: string): Promise<Brand> {
    try {
      const brand = await this.brandsRepository.findOne({ where: { id } });
      if (!brand) {
        throw new NotFoundException(`Brand with ID ${id} not found`);
      }
      brand.imageUrl = path;
      await this.brandsRepository.update(id, brand);
      return brand;
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }
}
