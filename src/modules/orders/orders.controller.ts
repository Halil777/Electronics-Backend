import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { DeleteResult } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      return await this.ordersService.create(createOrderDto);
    } catch (error) {
      throw new HttpException(
        `Failed to create order ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(): Promise<Order[]> {
    try {
      return await this.ordersService.findAll();
    } catch (error) {
      throw new HttpException(
        `Failed to get orders ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Order> {
    try {
      const order = await this.ordersService.findOne(id);
      if (!order) {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      return order;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Failed to get the order ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    try {
      const updatedOrder = await this.ordersService.update(id, updateOrderDto);
      if (!updatedOrder) {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      return updatedOrder;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Failed to update the order ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<DeleteResult> {
    try {
      const deleteResult = await this.ordersService.remove(id);
      if (deleteResult.affected === 0) {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      return deleteResult;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Failed to delete the order ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
