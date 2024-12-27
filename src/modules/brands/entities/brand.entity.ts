import { Product } from 'src/modules/products/entities/product.entity';
// import { Subcategory } from 'src/modules/subcategories/entities/subcategory.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  // ManyToOne,
  // JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Brand {
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

  // @ManyToOne(() => Subcategory, (subcategory) => subcategory.brands, {
  //   nullable: false,
  // })
  // @JoinColumn({ name: 'subcategory_id' })
  // subcategory: Subcategory;

  @OneToMany(() => Product, (products) => products.brand)
  products: Product[];

  // @Column()
  // subcategory_id: number;
}
