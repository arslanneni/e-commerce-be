import { Module } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { OrderItemsController } from './order-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EcmProduct } from 'src/products/entities/product.entity';
import { EcmOrder } from 'src/orders/entities/order.entity';
import { EcmOrderItem } from './entities/order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EcmProduct, EcmOrder, EcmOrderItem])],
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
})
export class OrderItemsModule {}
