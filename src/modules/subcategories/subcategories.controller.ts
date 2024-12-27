import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Delete,
  Patch,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SubcategoriesService } from './subcategories.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { editFileName } from '../category/category.controller';

@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'upload/subcategories',
        filename: editFileName,
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createSubcategoryDto: CreateSubcategoryDto,
  ) {
    if (!file) {
      throw new BadRequestException('No image file provided');
    }
    return await this.subcategoriesService.addSubcategory(
      file,
      createSubcategoryDto,
    );
  }

  @Get()
  async findAll() {
    return await this.subcategoriesService.getAllSubcategories();
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'upload/subcategories',
        filename: editFileName,
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateSubcategoryDto: UpdateSubcategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      return await this.subcategoriesService.updateSubcategoryImage(
        +id,
        file.path,
      );
    } else {
      return await this.subcategoriesService.updateSubcategory(
        +id,
        updateSubcategoryDto,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.subcategoriesService.deleteSubcategory(+id);
  }
}
