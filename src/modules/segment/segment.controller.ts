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
  NotFoundException, // Import NotFoundException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SegmentService } from './segment.service';
import { CreateSegmentDto } from './dto/create-segment.dto';
import { editFileName } from '../category/category.controller';
import { UpdateSegmentDto } from './dto/update-segment.dto';

@Controller('segment')
export class SegmentController {
  constructor(private readonly segmentService: SegmentService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'upload/segments',
        filename: editFileName,
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createSegmentDto: CreateSegmentDto,
  ) {
    if (!file) {
      throw new BadRequestException('No image file provided');
    }
    return await this.segmentService.addSegment(file, createSegmentDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const segment = await this.segmentService.getSegmentById(+id);
    if (!segment) {
      throw new NotFoundException(`Segment with ID ${id} not found`);
    }
    return segment;
  }
  @Get()
  async findAll() {
    return await this.segmentService.getAllSegments();
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'upload/segments',
        filename: editFileName,
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateSegmentDto: UpdateSegmentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      return await this.segmentService.updateSegmentImage(+id, file.path);
    } else {
      return await this.segmentService.updateSegment(
        +id,
        updateSegmentDto,
        file,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.segmentService.deleteSegment(+id);
  }
}
