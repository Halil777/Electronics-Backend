import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Subcategories') // Tag for grouping related endpoints in Swagger UI
@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new subcategory' })
  @ApiResponse({
    status: 201,
    description: 'The subcategory has been successfully created.',
  })
  create(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    return this.subcategoriesService.create(createSubcategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all subcategories' })
  @ApiResponse({
    status: 200,
    description: 'A list of all subcategories.',
  })
  findAll() {
    return this.subcategoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a subcategory by ID' })
  @ApiParam({ name: 'id', description: 'ID of the subcategory to retrieve' })
  @ApiResponse({
    status: 200,
    description: 'The requested subcategory has been found.',
  })
  @ApiResponse({
    status: 404,
    description: 'The subcategory was not found.',
  })
  findOne(@Param('id') id: string) {
    return this.subcategoriesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a subcategory by ID' })
  @ApiParam({ name: 'id', description: 'ID of the subcategory to update' })
  @ApiResponse({
    status: 200,
    description: 'The subcategory has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'The subcategory was not found.',
  })
  update(
    @Param('id') id: string,
    @Body() updateSubcategoryDto: UpdateSubcategoryDto,
  ) {
    return this.subcategoriesService.update(+id, updateSubcategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a subcategory by ID' })
  @ApiParam({ name: 'id', description: 'ID of the subcategory to delete' })
  @ApiResponse({
    status: 200,
    description: 'The subcategory has been successfully removed.',
  })
  @ApiResponse({
    status: 404,
    description: 'The subcategory was not found.',
  })
  remove(@Param('id') id: string) {
    return this.subcategoriesService.remove(+id);
  }
}
