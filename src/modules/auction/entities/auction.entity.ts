import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('auctions')
export class Auction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title_tm: string;

  @Column({ type: 'varchar', length: 255 })
  title_en: string;

  @Column({ type: 'varchar', length: 255 })
  title_ru: string;

  @Column({ type: 'text' })
  desc_tm: string;

  @Column({ type: 'text' })
  desc_en: string;

  @Column({ type: 'text' })
  desc_ru: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  buy_now_price: number;

  @Column({ type: 'timestamp' })
  auction_start: Date;

  @Column({ type: 'timestamp' })
  auction_end: Date;

  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 1 })
  min_increment: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
