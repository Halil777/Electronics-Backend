import { Injectable } from '@nestjs/common';
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

  // Create a new subcategory
  async create(
    createSubcategoryDto: CreateSubcategoryDto,
  ): Promise<Subcategory> {
    const subcategory = this.subcategoryRepository.create(createSubcategoryDto);
    return await this.subcategoryRepository.save(subcategory);
  }

  // Find all subcategories
  async findAll(): Promise<Subcategory[]> {
    return await this.subcategoryRepository.find();
  }

  // Find a subcategory by ID (Updated with FindOneOptions)
  async findOne(id: number): Promise<Subcategory | null> {
    return await this.subcategoryRepository.findOne({ where: { id } });
  }

  // Update a subcategory by ID
  async update(
    id: number,
    updateSubcategoryDto: UpdateSubcategoryDto,
  ): Promise<Subcategory> {
    await this.subcategoryRepository.update(id, updateSubcategoryDto);
    return this.findOne(id); // Returning the updated subcategory
  }

  // Remove a subcategory by ID
  async remove(id: number): Promise<void> {
    await this.subcategoryRepository.delete(id);
  }
}
