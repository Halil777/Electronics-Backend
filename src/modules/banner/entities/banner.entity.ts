import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('banners')
export class Banner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @Column({ nullable: true })
  title_tm?: string;

  @Column({ nullable: true })
  title_en?: string;

  @Column({ nullable: true })
  title_ru?: string;

  @Column({ nullable: true, type: 'text' })
  desc_tm?: string;

  @Column({ nullable: true, type: 'text' })
  desc_en?: string;

  @Column({ nullable: true, type: 'text' })
  desc_ru?: string;
}
