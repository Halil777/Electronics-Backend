import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subcategory } from './entities/subcategory.entity';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';

@Injectable()
export class SubcategoriesService {
  constructor(
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
  ) {}

  async addSubcategory(
    image: string,
    body: CreateSubcategoryDto,
  ): Promise<Subcategory> {
    try {
      const subcategory = new Subcategory();
      subcategory.imageUrl = image;
      subcategory.desc_tm = body.desc_tm;
      subcategory.desc_ru = body.desc_ru;
      subcategory.desc_en = body.desc_en;
      subcategory.title_tm = body.title_tm;
      subcategory.title_ru = body.title_ru;
      subcategory.title_en = body.title_en;
      return await this.subcategoryRepository.save(subcategory);
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }

  async updateSubcategory(
    id: number,
    body: UpdateSubcategoryDto,
  ): Promise<Subcategory> {
    try {
      const subcategory = await this.subcategoryRepository.findOne({
        where: { id },
      });
      if (!subcategory) {
        throw new NotFoundException(`Subcategory with ID ${id} not found`);
      }

      subcategory.desc_tm = body.desc_tm || subcategory.desc_tm;
      subcategory.desc_ru = body.desc_ru || subcategory.desc_ru;
      subcategory.desc_en = body.desc_en || subcategory.desc_en;
      subcategory.title_tm = body.title_tm || subcategory.title_tm;
      subcategory.title_ru = body.title_ru || subcategory.title_ru;
      subcategory.title_en = body.title_en || subcategory.title_en;

      await this.subcategoryRepository.update(id, subcategory);
      return subcategory;
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }

  async getAllSubcategories(): Promise<Subcategory[]> {
    try {
      const subcategories = await this.subcategoryRepository.find();
      return subcategories.map((subcategory) => ({
        ...subcategory,
        imageUrl: process.env.BASE_URL + '/' + subcategory.imageUrl,
      }));
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }

  async deleteSubcategory(id: number): Promise<void> {
    try {
      const result = await this.subcategoryRepository.delete({ id });
      if (!result.affected) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }

  async updateSubcategoryImage(id: number, path: string): Promise<Subcategory> {
    try {
      const subcategory = await this.subcategoryRepository.findOne({
        where: { id },
      });
      if (!subcategory) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }

      subcategory.imageUrl = path;
      await this.subcategoryRepository.update(id, subcategory);
      return subcategory;
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }
}
