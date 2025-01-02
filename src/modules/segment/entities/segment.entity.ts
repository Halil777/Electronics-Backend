import { Product } from 'src/modules/products/entities/product.entity';
import { Subcategory } from 'src/modules/subcategories/entities/subcategory.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Segment {
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

  @Column({ nullable: false })
  subcategory_id: number;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.segments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subcategory_id' })
  subcategory: Subcategory;

  @OneToMany(() => Product, (product) => product.segment)
  products: Product[];
}
