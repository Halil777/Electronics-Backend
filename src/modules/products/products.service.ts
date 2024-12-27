import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Brand } from '../brands/entities/brand.entity';
import { Category } from '../category/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const { brand_id, ...productData } = createProductDto;
      let brand = null;
      if (brand_id) {
        brand = await this.brandRepository.findOne({ where: { id: brand_id } });
        if (!brand) {
          throw new NotFoundException(`Brand with ID ${brand_id} not found`);
        }
      }

      const product = this.productRepository.create(productData);
      if (brand) {
        product.brand = brand;
      }
      return await this.productRepository.save(product);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new NotFoundException(err.message);
      }
      throw new BadRequestException(err);
    }
  }

  async findAll(query?: {
    page?: number;
    limit?: number;
  }): Promise<{ data: Product[]; total: number; page: number; limit: number }> {
    try {
      const { page = 1, limit = 10 } = query || {};
      const skip = (page - 1) * limit;

      const [products, total] = await this.productRepository.findAndCount({
        skip,
        take: limit,
        relations: ['brand', 'categories'], // Add relations if necessary
      });

      return {
        data: products,
        total,
        page,
        limit,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({
        where: { id },
        relations: ['brand', 'categories'], // Add relations if necessary
      });
      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return product;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new NotFoundException(err.message);
      }
      throw new BadRequestException(err);
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      const { brand_id, ...productData } = updateProductDto;
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      let brand = null;
      if (brand_id) {
        brand = await this.brandRepository.findOne({ where: { id: brand_id } });
        if (!brand) {
          throw new NotFoundException(`Brand with ID ${brand_id} not found`);
        }
      }

      Object.assign(product, productData);
      if (brand) {
        product.brand = brand;
      }
      return await this.productRepository.save(product);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new NotFoundException(err.message);
      }
      throw new BadRequestException(err);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.productRepository.delete({ id });
      if (!result.affected) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new NotFoundException(err.message);
      }
      throw new BadRequestException(err);
    }
  }
}

export enum ProductStatus {
  DRAFT = 'draft',
  PENDING_APPROVAL = 'pending_approval',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
