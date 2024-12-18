import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('embassys_rules') // Table name
export class EmbassyRule {
  @PrimaryGeneratedColumn()
  id: number; // Auto-incrementing primary key

  @Column({ type: 'varchar', length: 255 })
  title_tm: string; // Title in Turkmen

  @Column({ type: 'varchar', length: 255 })
  title_ru: string; // Title in Russian

  @Column({ type: 'varchar', length: 255 })
  title_en: string; // Title in English

  @Column({ type: 'text' })
  desc_tm: string; // Description in Turkmen

  @Column({ type: 'text' })
  desc_ru: string; // Description in Russian

  @Column({ type: 'text' })
  desc_en: string; // Description in English

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date; // Automatically generated timestamp

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date; // Automatically updated timestamp
}
