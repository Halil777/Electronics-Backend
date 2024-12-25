import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { SubcategoriesService } from './subcategories.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';

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
      file.path,
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
    }
    return await this.subcategoriesService.updateSubcategory(
      +id,
      updateSubcategoryDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.subcategoriesService.deleteSubcategory(+id);
  }
}

// Helper function to generate unique file names
export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};
