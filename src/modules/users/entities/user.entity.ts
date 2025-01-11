import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users') // The table name in the database
export class User {
  @PrimaryGeneratedColumn() // Automatically generates a unique identifier
  id: number;

  @Column({ type: 'varchar', length: 50 })
  firstName: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 15, unique: true })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  profileImage: string;

  /**
   * otp success bolsa true bolya
   */
  @Column({
    default: false,
  })
  is_confirmed: boolean;

  /**
   * Bildirishleri almak
   */
  @Column({
    default: false,
  })
  is_notify: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
