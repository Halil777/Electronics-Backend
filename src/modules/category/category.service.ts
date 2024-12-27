import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Add category with image
  async addCategory(image: string, body: CreateCategoryDto): Promise<Category> {
    try {
      const category = new Category();
      category.imageUrl = image; // Use the imageUrl from the request
      category.desc_tm = body.desc_tm;
      category.desc_ru = body.desc_ru;
      category.desc_en = body.desc_en;
      category.title_tm = body.title_tm;
      category.title_ru = body.title_ru;
      category.title_en = body.title_en;
      return await this.categoryRepository.save(category);
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }

  // Update category
  async updateCategory(id: number, body: UpdateCategoryDto): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({ where: { id } });
      if (!category) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }

      category.desc_tm = body.desc_tm || category.desc_tm;
      category.desc_ru = body.desc_ru || category.desc_ru;
      category.desc_en = body.desc_en || category.desc_en;
      category.title_tm = body.title_tm || category.title_tm;
      category.title_ru = body.title_ru || category.title_ru;
      category.title_en = body.title_en || category.title_en;

      await this.categoryRepository.update(id, category);
      return category;
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }

  // Get all categories
  async getAllCategories(): Promise<Category[]> {
    try {
      const categories = await this.categoryRepository.find();
      return categories.map((category) => ({
        ...category,
        imageUrl: process.env.BASE_URL + '/' + category.imageUrl,
      }));
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }

  // Delete category
  async deleteCategory(id: number): Promise<void> {
    try {
      const result = await this.categoryRepository.delete({ id });
      if (!result.affected) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }

  // Update category image
  async updateCategoryImage(id: number, path: string): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({ where: { id } });
      if (!category) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }

      category.imageUrl = path;
      await this.categoryRepository.update(id, category);
      return category;
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }
}
