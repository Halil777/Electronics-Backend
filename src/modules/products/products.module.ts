import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Brand } from '../brands/entities/brand.entity';
import { Segment } from '../segment/entities/segment.entity';
import { Subcategory } from '../subcategories/entities/subcategory.entity';
import { Category } from '../category/entities/category.entity';
import { Property } from '../properties/entities/property.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Brand,
      Subcategory,
      Segment,
      Category,
      Property,
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
