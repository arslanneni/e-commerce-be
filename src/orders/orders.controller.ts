import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('getAllOrders')
  getAllOrders() {
    return this.ordersService.getAllOrders();
  }

  @Get('getAllPendingOrders')
  getAllActiveOrders() {
    return this.ordersService.getAllPendingOrders();
  }
  @Get('getAllDeliveredOrders')
  getAllDeliveredOrders() {
    return this.ordersService.getAllDeliveredOrders();
  }
  @Get('getAllShippedOrders')
  getAllShippedOrders() {
    return this.ordersService.getAllShippedOrders();
  }
  @Post('createdOrder')
  createdOrder(createOrderDto: CreateOrderDto) {
    return this.ordersService.createdOrder(createOrderDto);
  }
}
