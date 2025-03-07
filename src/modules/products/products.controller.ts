import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  ParseIntPipe,
  DefaultValuePipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Product } from './entities/product.entity';
import { editFileName } from 'src/utils/editFile';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product with images' })
  @ApiResponse({
    status: 201,
    description: 'Product successfully created.',
    type: Product,
  })
  @ApiResponse({ status: 400, description: 'Invalid data or files.' })
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './upload/products',
        filename: editFileName,
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return callback(
            new BadRequestException(
              'Only JPG, JPEG, PNG, and GIF files are allowed!',
            ),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() images?: Express.Multer.File[],
  ) {
    return this.productsService.create(createProductDto, images);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of all products with pagination' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of products per page (default: 10)',
  })
  @ApiResponse({
    status: 200,
    description: 'List of products successfully retrieved.',
    type: [Product],
  })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.productsService.findAll({ page, limit });
  }

  @Get('client/filters')
  async getFilters() {
    return this.productsService.getFilters();
  }

  @Get('client/products')
  @ApiOperation({
    summary: 'Get a list of all products for clients with pagination',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of products per page (default: 10)',
  })
  @ApiQuery({
    name: 'categoryId',
    required: false,
    description: 'Category id (default: undefined)',
  })
  @ApiQuery({
    name: 'subcategoryId',
    required: false,
    description: 'Sub Category id (default: undefined)',
  })
  @ApiQuery({
    name: 'segmentId',
    required: false,
    description: 'Segment id (default: undefined)',
  })
  @ApiQuery({
    name: 'brandId',
    required: false,
    description: 'Brand id (default: undefined)',
  })
  @ApiResponse({
    status: 200,
    description: 'List of products successfully retrieved.',
    type: [Product],
  })
  async clientProducts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('categoryId')
    categoryId?: number | undefined,
    @Query('subcategoryId')
    subcategoryId?: number | undefined,
    @Query('segmentId')
    segmentId?: number | undefined,
    @Query('brandId')
    brandId?: number | undefined,
  ) {
    return this.productsService.findAll({
      page,
      limit,
      categoryId,
      subcategoryId,
      segmentId,
      brandId,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID', type: String })
  @ApiResponse({
    status: 200,
    description: 'Product successfully found.',
    type: Product,
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update product data and images' })
  @ApiParam({ name: 'id', description: 'Product ID', type: String })
  @ApiResponse({
    status: 200,
    description: 'Product successfully updated.',
    type: Product,
  })
  @ApiResponse({ status: 400, description: 'Invalid data or files.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './upload/products',
        filename: editFileName,
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return callback(
            new BadRequestException(
              'Only JPG, JPEG, PNG, and GIF files are allowed!',
            ),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() images?: Express.Multer.File[],
  ) {
    return this.productsService.update(id, updateProductDto, images);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({ name: 'id', description: 'Product ID', type: String })
  @ApiResponse({ status: 204, description: 'Product successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.productsService.remove(id);
    return;
  }
}
