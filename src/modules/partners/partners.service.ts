import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { Partner } from './entities/partner.entity'; // Assuming your entity is in this path

@Injectable()
export class PartnersService {
  constructor(
    @InjectRepository(Partner)
    private readonly partnerRepository: Repository<Partner>,
  ) {}

  // Add a new partner with an image
  async addPartner(image: string, body: CreatePartnerDto): Promise<Partner> {
    try {
      const partner = new Partner();
      partner.imageUrl = image; // Use the image path from the controller
      partner.desc_tm = body.desc_tm;
      partner.desc_ru = body.desc_ru;
      partner.desc_en = body.desc_en;
      partner.title_tm = body.title_tm;
      partner.title_ru = body.title_ru;
      partner.title_en = body.title_en;
      return await this.partnerRepository.save(partner);
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }

  // Update partner
  async updatePartner(id: number, body: UpdatePartnerDto): Promise<Partner> {
    try {
      const partner = await this.partnerRepository.findOne({ where: { id } });
      if (!partner) {
        throw new NotFoundException(`Partner with ID ${id} not found`);
      }

      partner.desc_tm =
        body.desc_tm !== undefined ? body.desc_tm : partner.desc_tm;
      partner.desc_ru =
        body.desc_ru !== undefined ? body.desc_ru : partner.desc_ru;
      partner.desc_en =
        body.desc_en !== undefined ? body.desc_en : partner.desc_en;
      partner.title_tm =
        body.title_tm !== undefined ? body.title_tm : partner.title_tm;
      partner.title_ru =
        body.title_ru !== undefined ? body.title_ru : partner.title_ru;
      partner.title_en =
        body.title_en !== undefined ? body.title_en : partner.title_en;

      await this.partnerRepository.update(id, partner);
      return await this.partnerRepository.findOne({ where: { id } });
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }

  // Get all partners
  async getAllPartners(): Promise<Partner[]> {
    try {
      const partners = await this.partnerRepository.find();
      return partners.map((partner) => ({
        ...partner,
        imageUrl: process.env.BASE_URL + '/' + partner.imageUrl,
      }));
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }

  // Get a partner by ID
  async getPartner(id: number): Promise<Partner> {
    try {
      const partner = await this.partnerRepository.findOne({ where: { id } });
      if (!partner) {
        throw new NotFoundException(`Partner with ID ${id} not found`);
      }
      return partner;
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }

  // Delete a partner
  async deletePartner(id: number): Promise<void> {
    try {
      const result = await this.partnerRepository.delete({ id });
      if (!result.affected) {
        throw new NotFoundException(`Partner with ID ${id} not found`);
      }
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }

  // Update partner image
  async updatePartnerImage(id: number, path: string): Promise<Partner> {
    try {
      const partner = await this.partnerRepository.findOne({ where: { id } });
      if (!partner) {
        throw new NotFoundException(`Partner with ID ${id} not found`);
      }

      partner.imageUrl = path;
      await this.partnerRepository.update(id, partner);
      return await this.partnerRepository.findOne({ where: { id } });
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }
}
