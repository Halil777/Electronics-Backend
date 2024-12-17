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

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый продукт' })
  @ApiResponse({ status: 201, description: 'Продукт успешно создан.' })
  @ApiResponse({ status: 400, description: 'Некорректные данные.' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех продуктов' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Номер страницы для пагинации',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Количество продуктов на страницу',
  })
  @ApiResponse({
    status: 200,
    description: 'Список продуктов успешно получен.',
  })
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.productsService.findAll({ page, limit });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить продукт по ID' })
  @ApiParam({ name: 'id', description: 'Идентификатор продукта' })
  @ApiResponse({ status: 200, description: 'Продукт успешно найден.' })
  @ApiResponse({ status: 404, description: 'Продукт не найден.' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить данные продукта' })
  @ApiParam({ name: 'id', description: 'Идентификатор продукта' })
  @ApiResponse({ status: 200, description: 'Продукт успешно обновлён.' })
  @ApiResponse({ status: 404, description: 'Продукт не найден.' })
  @ApiResponse({ status: 400, description: 'Некорректные данные.' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить продукт' })
  @ApiParam({ name: 'id', description: 'Идентификатор продукта' })
  @ApiResponse({ status: 200, description: 'Продукт успешно удалён.' })
  @ApiResponse({ status: 404, description: 'Продукт не найден.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
