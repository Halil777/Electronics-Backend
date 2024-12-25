import { Brand } from 'src/modules/brands/entities/brand.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Subcategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ type: 'varchar', length: 255 })
  title_tm: string;

  @Column({ type: 'varchar', length: 255 })
  title_ru: string;

  @Column({ type: 'varchar', length: 255 })
  title_en: string;

  @Column({ type: 'text', nullable: true })
  desc_tm?: string;

  @Column({ type: 'text', nullable: true })
  desc_ru?: string;

  @Column({ type: 'text', nullable: true })
  desc_en?: string;

  // Establish a many-to-one relationship with the Category
  @ManyToOne(() => Category, (category) => category.subcategories, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  // Establish a one-to-many relationship with the Brand
  @OneToMany(() => Brand, (brand) => brand.subcategory)
  brands: Brand[];
}
