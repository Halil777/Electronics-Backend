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
import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  // Create partner with an image
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'upload/partners', // Changed destination
        filename: editFileName,
      }),
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPartnerDto: CreatePartnerDto, // Changed DTO
  ) {
    if (!file) {
      throw new BadRequestException('No image file provided');
    }
    return this.partnersService.addPartner(file.path, createPartnerDto); // Changed service call
  }

  // Get all partners
  @Get()
  findAll() {
    return this.partnersService.getAllPartners(); // Changed service call
  }

  // Update partner with a new image (optional)
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'upload/partners', // Changed destination
        filename: editFileName,
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updatePartnerDto: UpdatePartnerDto, // Changed DTO
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      return await this.partnersService.updatePartnerImage(+id, file.path); // Changed service call
    } else {
      return await this.partnersService.updatePartner(+id, updatePartnerDto); // Changed service call
    }
  }

  // Delete partner
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partnersService.deletePartner(+id); // Changed service call
  }
}

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}-${file.originalname}`);
};
