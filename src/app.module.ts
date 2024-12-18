import { Module } from '@nestjs/common';
import * as process from 'node:process';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'node:path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer'; // Updated import for better clarity
import { UsersModule } from './modules/users/users.module';
import { CategoryModule } from './modules/category/category.module';
import { DeliveryRuleModule } from './modules/delivery_rule/delivery_rule.module';
import { ServiceRuleModule } from './modules/service_rule/service_rule.module';
import { ReturnRuleModule } from './modules/return_rule/return_rule.module';
import { OrderRuleModule } from './modules/order_rule/order_rule.module';
import { EmbassyRulesModule } from './modules/embassy_rules/embassy_rules.module';
import { SubcategoriesModule } from './modules/subcategories/subcategories.module';
import { BrandsModule } from './modules/brands/brands.module';
import { ProductsModule } from './modules/products/products.module';

// Entities
import { Category } from './modules/category/entities/category.entity';
import { User } from './modules/users/entities/user.entity';
import { DeliveryRule } from './modules/delivery_rule/entities/delivery_rule.entity';
import { ServiceRule } from './modules/service_rule/entities/service_rule.entity';
import { ReturnRule } from './modules/return_rule/entities/return_rule.entity';
import { OrderRule } from './modules/order_rule/entities/order_rule.entity';
import { EmbassyRule } from './modules/embassy_rules/entities/embassy_rule.entity';
import { Subcategory } from './modules/subcategories/entities/subcategory.entity';
import { Brand } from './modules/brands/entities/brand.entity';
import { Product } from './modules/products/entities/product.entity';

@Module({
  imports: [
    // Serve static files
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'upload'), // Updated to 'public' for better convention
      serveRoot: '/upload', // Optional: Serve files under `/static` path
    }),

    // File upload configuration
    MulterModule.register({
      storage: diskStorage({
        destination: './upload', // Directory for uploaded files
        filename: (req, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),

    // Environment configuration
    ConfigModule.forRoot({
      isGlobal: true, // Make environment variables available globally
      envFilePath: ['.env'], // Load environment variables from `.env` file
    }),

    // Database configuration
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT || 5433,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'QwertyWeb123',
      database: process.env.DB_DATABASE || 'electronics_db',
      entities: [
        Category,
        User,
        DeliveryRule,
        ServiceRule,
        ReturnRule,
        OrderRule,
        EmbassyRule,
        Subcategory,
        Brand,
        Product,
      ],
      synchronize: true, // Automatically sync schema; turn off in production
      logging: true,
    }),

    // Modules
    UsersModule,
    CategoryModule,
    DeliveryRuleModule,
    ServiceRuleModule,
    ReturnRuleModule,
    OrderRuleModule,
    EmbassyRulesModule,
    SubcategoriesModule,
    BrandsModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
