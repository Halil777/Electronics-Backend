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
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { extname } from 'path';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  // Create banner with an image
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'upload/banner',
        filename: editFileName,
      }),
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createBannerDto: CreateBannerDto,
  ) {
    if (!file) {
      throw new BadRequestException('No image file provided');
    }
    return this.bannerService.addBanner(file.path, createBannerDto);
  }

  // Get all banners
  @Get()
  findAll() {
    return this.bannerService.getAllBanners();
  }

  // Update banner with a new image (optional)
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'upload/banner',
        filename: editFileName,
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateBannerDto: UpdateBannerDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      return await this.bannerService.updateBannerImage(+id, file.path);
    } else {
      return await this.bannerService.updateBanner(+id, updateBannerDto);
    }
  }

  // Delete banner
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bannerService.deleteBanner(+id);
  }
}

export const editFileName = (req, file, callback) => {
  console.log(file.originalname);
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}-${file.originalname}`);
};
