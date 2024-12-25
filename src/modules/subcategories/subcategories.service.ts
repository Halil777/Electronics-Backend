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
import { Category } from '../category/entities/category.entity';
import { join, extname } from 'path';
import * as sharp from 'sharp';

@Injectable()
export class SubcategoriesService {
  constructor(
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  private async optimizeAndSaveImage(
    buffer: Buffer,
    filename: string,
    mimetype: string,
  ): Promise<string> {
    const optimizedImagePath = join('upload/subcategories/', filename);
    await sharp(buffer, { failOnError: false })
      .resize(300)
      .jpeg({ quality: 98 })
      .toFile(optimizedImagePath);
    return optimizedImagePath;
  }

  async addSubcategory(
    file: Express.Multer.File,
    body: CreateSubcategoryDto,
  ): Promise<Subcategory> {
    try {
      let image = null;
      if (file) {
        const fileExtension = extname(file.originalname);
        const filename = `${Date.now()}${fileExtension}`;
        image = await this.optimizeAndSaveImage(
          file.buffer,
          filename,
          file.mimetype,
        );
      }
      const category = await this.categoryRepository.findOne({
        where: { id: body.category_id },
      });

      if (!category) {
        throw new NotFoundException(
          `Category with ID ${body.category_id} not found`,
        );
      }

      const subcategory = new Subcategory();
      subcategory.imageUrl = image;
      subcategory.desc_tm = body.desc_tm;
      subcategory.desc_ru = body.desc_ru;
      subcategory.desc_en = body.desc_en;
      subcategory.title_tm = body.title_tm;
      subcategory.title_ru = body.title_ru;
      subcategory.title_en = body.title_en;
      subcategory.category = category;

      return await this.subcategoryRepository.save(subcategory);
    } catch (err) {
      console.error(err);
      if (err instanceof NotFoundException) {
        throw new NotFoundException(err.message);
      }
      throw new BadRequestException(err);
    }
  }

  async updateSubcategory(
    id: number,
    body: UpdateSubcategoryDto,
    file?: Express.Multer.File,
  ): Promise<Subcategory> {
    try {
      const subcategory = await this.subcategoryRepository.findOne({
        where: { id },
      });
      if (!subcategory) {
        throw new NotFoundException(`Subcategory with ID ${id} not found`);
      }

      let image = subcategory.imageUrl;
      if (file) {
        const fileExtension = extname(file.originalname);
        const filename = `${Date.now()}${fileExtension}`;
        image = await this.optimizeAndSaveImage(
          file.buffer,
          filename,
          file.mimetype,
        );
      }

      subcategory.desc_tm = body.desc_tm || subcategory.desc_tm;
      subcategory.desc_ru = body.desc_ru || subcategory.desc_ru;
      subcategory.desc_en = body.desc_en || subcategory.desc_en;
      subcategory.title_tm = body.title_tm || subcategory.title_tm;
      subcategory.title_ru = body.title_ru || subcategory.title_ru;
      subcategory.title_en = body.title_en || subcategory.title_en;

      subcategory.imageUrl = image;
      await this.subcategoryRepository.update(id, subcategory);
      return subcategory;
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }

  async getAllSubcategories(): Promise<Subcategory[]> {
    try {
      const subcategories = await this.subcategoryRepository.find({
        relations: ['category'],
      });
      return subcategories;
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }

  async deleteSubcategory(id: number): Promise<void> {
    try {
      const result = await this.subcategoryRepository.delete({ id });
      if (!result.affected) {
        throw new NotFoundException(`Subcategory with ID ${id} not found`);
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
