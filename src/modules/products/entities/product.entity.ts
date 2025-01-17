import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Brand } from '../../brands/entities/brand.entity';
import { Subcategory } from '../../subcategories/entities/subcategory.entity';
import { Property } from '../../properties/entities/property.entity';
import { Segment } from 'src/modules/segment/entities/segment.entity';
import { OrderItem } from 'src/modules/orders/entities/order-item.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid') // Changed to UUID
  id: string;

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
  brand?: Relation<Brand>;

  @Column({ nullable: true })
  brand_id?: string; // Changed to string

  @ManyToOne(() => Subcategory, (category) => category.products, {
    nullable: true,
  })
  @JoinColumn({ name: 'category_id' })
  category?: Relation<Subcategory>;

  @Column({ nullable: true })
  category_id?: string; // Changed to string

  @ManyToOne(() => Segment, (segment) => segment.products, { nullable: true })
  @JoinColumn({ name: 'segment_id' })
  segment?: Relation<Segment>;

  @Column({ nullable: true })
  segment_id?: string; // Changed to string

  @ManyToMany(() => Property)
  @JoinTable({
    name: 'property',
    joinColumn: { name: 'product_id' },
    inverseJoinColumn: { name: 'property_id' },
  })
  properties?: Relation<Property[]>;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems?: Relation<OrderItem[]>;

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
