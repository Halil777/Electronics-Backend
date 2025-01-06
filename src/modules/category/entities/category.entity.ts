import { Product } from 'src/modules/products/entities/product.entity';
import { Subcategory } from 'src/modules/subcategories/entities/subcategory.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title_tm: string;

  @Column()
  title_ru: string;

  @Column()
  title_en: string;

  @Column({ nullable: true, type: 'text' })
  desc_tm?: string;

  @Column({ nullable: true, type: 'text' })
  desc_ru?: string;

  @Column({ nullable: true, type: 'text' })
  desc_en?: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategories: Subcategory[];

  // Update the relationship with Product to OneToMany
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
