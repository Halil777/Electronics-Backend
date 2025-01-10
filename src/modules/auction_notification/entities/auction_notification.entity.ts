import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('auction_notifications')
export class AuctionNotification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title_tm: string;

  @Column({ type: 'varchar', length: 255 })
  title_en: string;

  @Column({ type: 'varchar', length: 255 })
  title_ru: string;

  @Column({ type: 'text' })
  message_tm: string;

  @Column({ type: 'text' })
  message_en: string;

  @Column({ type: 'text' })
  message_ru: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
