import { Brand } from 'src/modules/brands/entities/brand.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
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
  discounted_price?: number; // Цена с учётом скидки (если нужно для быстрого доступа)

  // Данные для управления складом
  @Column({ type: 'integer', default: 0 })
  stock: number; // Остаток на складе

  @Column({ type: 'varchar', length: 50, unique: true })
  sku?: string;
  //Уникальный код продукта

  // Статус продукта
  @Column({ type: 'boolean', default: true })
  is_active?: boolean;

  // Вес и размеры для логистики
  @Column({ type: 'float', nullable: true })
  weight?: number; // Вес в килограммах

  //   @Column({ type: 'float', nullable: true })
  //   width?: number; // Ширина

  //   @Column({ type: 'float', nullable: true })
  //   height?: number; // Высота

  //   @Column({ type: 'float', nullable: true })
  //   depth?: number; // Глубина

  // Дополнительные данные
  @Column({ type: 'text', nullable: true })
  images?: string;

  //   @Column({ type: 'text', array: true, nullable: true })
  //   tags?: string[]; // Теги для фильтров

  //   @Column({ type: 'text', nullable: true })
  //   video_url?: string; // Видео о продукте

  @Column({ type: 'integer', default: 0 })
  views?: number; // Количество просмотров

  @Column({ type: 'float', default: 0 })
  rating?: number; // Рейтинг (например, от 1 до 5)

  // Связи с другими таблицами
  @ManyToOne(() => Brand, (brand) => brand.products, { nullable: false })
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @Column()
  brand_id: number;

  //   @Column()
  //   subcategory_id: number;

  // Метаданные
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
