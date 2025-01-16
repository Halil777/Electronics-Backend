import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { ProductsService } from 'src/modules/products/products.service';
import { User } from 'src/modules/users/entities/user.entity';
import { Product } from 'src/modules/products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @Inject(forwardRef(() => ProductsService))
    private productsService: ProductsService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { userId, shippingAddress, billingAddress, items } = createOrderDto;

    // Create User Object
    const user = new User();
    user.id = userId;

    const order = this.orderRepository.create({
      user: user,
      shippingAddress,
      billingAddress,
    });

    // calculate total amount, fetching prices from product service
    let totalAmount = 0;
    const orderItems = [];
    for (const itemDto of items) {
      const product = await this.productsService.findOne(itemDto.productId);
      if (!product) {
        throw new NotFoundException(
          `Product with ID ${itemDto.productId} not found`,
        );
      }

      // Create Product Object
      const productEntity = new Product();
      productEntity.id = itemDto.productId;

      const orderItem = this.orderItemRepository.create({
        product: productEntity,
        quantity: itemDto.quantity,
        price: product.price,
      });
      totalAmount += itemDto.quantity * product.price;
      orderItems.push(orderItem);
    }

    order.orderItems = orderItems;
    order.totalAmount = totalAmount;

    const savedOrder = await this.orderRepository.save(order);

    await Promise.all(
      orderItems.map(async (orderItem) => {
        orderItem.order = savedOrder;
        await this.orderItemRepository.save(orderItem);
      }),
    );

    return savedOrder;
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: ['user', 'orderItems', 'orderItems.product'],
    });
  }

  async findOne(id: string): Promise<Order | null> {
    return await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'orderItems', 'orderItems.product'],
    });
  }

  async update(
    id: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order | null> {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      return null;
    }

    Object.assign(order, updateOrderDto);

    return await this.orderRepository.save(order);
  }

  async remove(id: string): Promise<DeleteResult> {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return await this.orderRepository.delete(id);
  }
}
