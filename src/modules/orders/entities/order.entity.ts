import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Relation,
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Exclude } from 'class-transformer';

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded', // Add a refunded status if refunds are possible
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  PAYPAL = 'paypal',
  BANK_TRANSFER = 'bank_transfer',
  CASH_ON_DELIVERY = 'cash_on_delivery',
  // Add more as needed
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Relation<User>;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  //  new fields

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  shippingFee: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  taxAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  discountAmount: number;

  @Column({ type: 'text', nullable: true })
  shippingAddress: string;

  @Column({ type: 'text', nullable: true })
  billingAddress: string;

  @Column({ type: 'enum', enum: PaymentMethod, nullable: true })
  paymentMethod: PaymentMethod;

  @Column({ type: 'text', nullable: true })
  paymentId: string; // ID from payment provider (if applicable)

  //  optional fields
  @Column({ type: 'text', nullable: true })
  trackingNumber: string;

  @Column({ type: 'text', nullable: true })
  customerNote: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  @Exclude()
  orderItems: Relation<OrderItem[]>;

  // @OneToOne(() => Payment, (payment) => payment.order)
  // payment: Relation<Payment>;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
