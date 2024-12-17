import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private products = [];
  private idCounter = 1;

  create(createProductDto: CreateProductDto) {
    const newProduct = {
      id: this.idCounter++,
      ...createProductDto,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  findAll(query?: { page?: number; limit?: number }) {
    const { page = 1, limit = 10 } = query || {};
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    return {
      data: this.products.slice(startIndex, endIndex),
      total: this.products.length,
      page,
      limit,
    };
  }

  findOne(id: number) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updateProductDto,
    };
    return this.products[productIndex];
  }

  remove(id: number) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
    const deletedProduct = this.products.splice(productIndex, 1);
    return {
      message: `Product with ID ${id} has been deleted.`,
      deletedProduct,
    };
  }
}
