import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSegmentDto } from './dto/create-segment.dto';
import { UpdateSegmentDto } from './dto/update-segment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Segment } from './entities/segment.entity';
import { Repository } from 'typeorm';
import { Subcategory } from '../subcategories/entities/subcategory.entity';

@Injectable()
export class SegmentService {
  constructor(
    @InjectRepository(Segment)
    private segmentRepository: Repository<Segment>,

    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
  ) {}

  async addSegment(
    file: Express.Multer.File,
    body: CreateSegmentDto,
  ): Promise<Segment> {
    try {
      let image = null;
      if (file) {
        image = file.path;
      }
      const subcategory = await this.subcategoryRepository.findOne({
        where: { id: body.subcategory_id },
      });
      if (!subcategory) {
        throw new NotFoundException(
          `Segment with ID ${body.subcategory_id} not found`,
        );
      }
      const segment = new Segment();
      segment.imageUrl = image;
      segment.title_tm = body.title_tm;
      segment.title_en = body.title_en;
      segment.title_ru = body.title_ru;
      segment.desc_en = body.desc_en;
      segment.desc_ru = body.desc_ru;
      segment.desc_tm = body.desc_tm;
      segment.subcategory = subcategory;

      return await this.segmentRepository.save(segment);
    } catch (err) {
      console.log(err);
      if (err instanceof NotFoundException) {
        throw new NotFoundException(err.message);
      }
      throw new BadRequestException(err);
    }
  }

  async updateSegment(
    id: number,
    body: UpdateSegmentDto,
    file?: Express.Multer.File,
  ): Promise<Segment> {
    try {
      const segment = await this.segmentRepository.findOne({
        where: { id },
        relations: ['subcategory'],
      });
      if (!segment) {
        throw new NotFoundException(`Segment with ID ${id} not found`);
      }

      let image = segment.imageUrl;
      if (file) {
        image = file.path;
      }

      if (body.subcategory_id) {
        const subcategory = await this.subcategoryRepository.findOne({
          where: { id: body.subcategory_id },
        });
        if (!subcategory) {
          throw new NotFoundException(
            `Subcategory with id ${body.subcategory_id} not found`,
          );
        }
        segment.subcategory = subcategory;
      }

      segment.title_en = body.title_en || segment.title_en;
      segment.title_tm = body.title_tm || segment.title_tm;
      segment.title_ru = body.title_ru || segment.title_ru;
      segment.desc_tm = body.desc_tm || segment.desc_tm;
      segment.desc_en = body.desc_en || segment.desc_en;
      segment.desc_ru = body.desc_ru || segment.desc_ru;
      segment.imageUrl = image;

      await this.segmentRepository.save(segment);
      return segment;
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }

  async getAllSegments(): Promise<Segment[]> {
    try {
      const segments = await this.segmentRepository.find({
        relations: ['subcategory'],
      });
      return segments.map((segment) => ({
        ...segment,
        imageUrl: process.env.BASE_URL + '/' + segment.imageUrl,
      }));
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }
  async deleteSegment(id: number): Promise<void> {
    try {
      const result = await this.segmentRepository.delete({ id });
      if (!result.affected) {
        throw new NotFoundException(`Segment with ID ${id} not found`);
      }
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }
  async updateSegmentImage(id: number, path: string): Promise<Segment> {
    try {
      const segment = await this.segmentRepository.findOne({
        where: { id },
      });
      if (!segment) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      segment.imageUrl = path;
      await this.segmentRepository.save(segment);
      return segment;
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }
}
