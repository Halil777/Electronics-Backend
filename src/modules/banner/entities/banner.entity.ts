import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Banner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl?: string;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
