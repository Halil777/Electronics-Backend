import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Brand } from '../brands/entities/brand.entity';
import { Category } from '../category/entities/category.entity';
import { Segment } from '../segment/entities/segment.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Segment)
    private readonly segmentRepository: Repository<Segment>,
  ) {}

  /**
   * Create a new product
   */
  async create(
    createProductDto: CreateProductDto,
    images?: Express.Multer.File[],
  ): Promise<Product> {
    const { brand_id, category_id, segment_id, ...productData } =
      createProductDto;

    const product = this.productRepository.create(productData);

    if (brand_id) product.brand = await this.findBrand(brand_id);
    if (category_id) product.category = await this.findCategory(category_id); // Single category
    if (segment_id) product.segment = await this.findSegment(segment_id);

    if (images?.length) {
      const baseUrl = `${process.env.BASE_URL}/upload/products`;
      product.images = images.map((file) => `${baseUrl}/${file.filename}`);
    }

    return this.productRepository.save(product);
  }

  /**
   * Retrieve all products with pagination
   */
  async findAll(query: {
    page: number;
    limit: number;
  }): Promise<{ data: Product[]; total: number }> {
    const { page, limit } = query;
    const [products, total] = await this.productRepository.findAndCount({
      relations: ['brand', 'category', 'segment'], // Updated to 'category'
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data: products, total };
  }

  /**
   * Retrieve a single product by ID
   */
  async findById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['brand', 'category', 'segment'], // Updated to 'category'
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  /**
   * Update an existing product
   */
  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    images?: Express.Multer.File[],
  ): Promise<Product> {
    const product = await this.findById(id);

    const { brand_id, category_id, segment_id, ...productData } =
      updateProductDto;

    if (brand_id) product.brand = await this.findBrand(brand_id);
    if (category_id) product.category = await this.findCategory(category_id); // Single category
    if (segment_id) product.segment = await this.findSegment(segment_id);

    if (images?.length) {
      const baseUrl = `${process.env.BASE_URL}/upload/products`;
      product.images = [
        ...(product.images || []),
        ...images.map((file) => `${baseUrl}/${file.filename}`),
      ];
    }

    Object.assign(product, productData);
    return this.productRepository.save(product);
  }

  /**
   * Delete a product
   */
  async remove(id: number): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  /**
   * Helper method to find a brand by ID
   */
  private async findBrand(id: number): Promise<Brand> {
    const brand = await this.brandRepository.findOne({ where: { id } });
    if (!brand) throw new NotFoundException(`Brand with ID ${id} not found`);
    return brand;
  }

  /**
   * Helper method to find a category by ID
   */
  private async findCategory(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category)
      throw new NotFoundException(`Category with ID ${id} not found`);
    return category;
  }

  /**
   * Helper method to find a segment by ID
   */
  private async findSegment(id: number): Promise<Segment> {
    const segment = await this.segmentRepository.findOne({ where: { id } });
    if (!segment) {
      throw new NotFoundException(`Segment with ID ${id} not found`);
    }
    return segment;
  }
}
