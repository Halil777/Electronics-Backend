import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private brandsRepository: Repository<Brand>,
  ) {}

  // Create a new brand
  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    const brand = this.brandsRepository.create(createBrandDto);
    return await this.brandsRepository.save(brand);
  }

  // Get all brands
  async findAll(): Promise<Brand[]> {
    return await this.brandsRepository.find();
  }

  // Get a brand by its ID
  async findOne(id: number): Promise<Brand> {
    const brand = await this.brandsRepository.findOne({
      where: { id },
    });
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
    return brand;
  }

  // Update a brand by its ID
  async update(id: number, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    const brand = await this.findOne(id); // Check if the brand exists
    Object.assign(brand, updateBrandDto); // Apply the updates
    return await this.brandsRepository.save(brand); // Save the updated brand
  }

  // Remove a brand by its ID
  async remove(id: number): Promise<void> {
    const brand = await this.findOne(id); // Check if the brand exists
    await this.brandsRepository.remove(brand); // Remove the brand from the database
  }
}
