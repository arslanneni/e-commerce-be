import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { CreateOrderItemsDto } from './dto/create-order-item.dto';

@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Get('getAllOrderItems')
  findAll() {
    return this.orderItemsService.getAllOrderItems();
  }

  @Post('createdOrderItems')
  createdOrder(@Body() createOrderItemsDto: CreateOrderItemsDto) {
    return this.orderItemsService.createOrderItems(createOrderItemsDto);
  }
}
