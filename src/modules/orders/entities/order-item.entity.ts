import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Relation,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { Exclude } from 'class-transformer';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.orderItems, {
    onDelete: 'CASCADE',
  })
  @Exclude()
  @JoinColumn({ name: 'order_id' })
  order: Relation<Order>;

  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: 'product_id' })
  product: Relation<Product>;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  //  new field
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  discountPrice: number;
}
