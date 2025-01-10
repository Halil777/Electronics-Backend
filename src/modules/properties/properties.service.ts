import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}
  async create(createPropertyDto: CreatePropertyDto) {
    const result = await this.propertyRepository.save({
      ...createPropertyDto,
    });
    return result;
  }

  async findAll() {
    return await this.propertyRepository.find();
  }

  async update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return await this.propertyRepository.update(id, {
      ...updatePropertyDto,
    });
  }

  async remove(id: number) {
    return await this.propertyRepository.delete(id);
  }
}
