import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';

export enum PropertyType {
  PLAIN = 'plain',
  COLOR = 'color',
}

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title_tm: string;

  @Column()
  title_ru: string;

  @Column()
  title_en: string;

  @Column()
  value_tm: string;

  @Column()
  value_ru: string;

  @Column()
  value_en: string;

  @Column({
    type: 'enum',
    enum: PropertyType,
    default: PropertyType.PLAIN,
  })
  type: PropertyType;

  @ManyToOne(() => Product, (product) => product.properties, {
    nullable: false,
  })
  @JoinColumn({ name: 'product_id' })
  product?: Product;

  @Column({ nullable: false })
  product_id?: number;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
