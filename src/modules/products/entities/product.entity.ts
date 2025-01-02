import { Brand } from 'src/modules/brands/entities/brand.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { Segment } from 'src/modules/segment/entities/segment.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({ type: 'float', nullable: false })
  price: number;

  @Column({ type: 'float', nullable: true })
  old_price?: number;

  @Column({ type: 'float', nullable: true })
  discount_percentage?: number;

  @Column({ type: 'float', nullable: true })
  discounted_price?: number;

  @Column({ type: 'integer', default: 0 })
  stock: number;

  @Column({ type: 'boolean', default: true })
  is_active?: boolean;

  @Column({ type: 'float', nullable: true })
  weight?: number;

  @Column({ type: 'float', nullable: true })
  width?: number;

  @Column({ type: 'float', nullable: true })
  height?: number;

  @Column({ type: 'float', nullable: true })
  depth?: number;

  @Column({ type: 'simple-array', nullable: true })
  images: string[];

  @Column({ type: 'text', nullable: true })
  size?: string;

  @Column({ type: 'text', nullable: true })
  color?: string;

  @Column({ type: 'text', nullable: true })
  tags?: string;

  @Column({ type: 'integer', default: 0 })
  views?: number;

  @Column({ type: 'float', default: 0 })
  rating?: number;

  // Relationships
  @ManyToOne(() => Brand, (brand) => brand.products, { nullable: true })
  @JoinColumn({ name: 'brand_id' })
  brand?: Brand;

  @Column({ nullable: true })
  brand_id?: number;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({ name: 'product_categories' })
  categories?: Category[];

  @ManyToOne(() => Segment, (segment) => segment.products, { nullable: true })
  @JoinColumn({ name: 'segment_id' })
  segment?: Segment;

  @Column({ nullable: true })
  segment_id?: number;

  // Meta-data
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
