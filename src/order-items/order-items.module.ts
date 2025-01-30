import { Module } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { OrderItemsController } from './order-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EcmProduct } from 'src/products/entities/product.entity';
import { EcmOrder } from 'src/orders/entities/order.entity';
import { EcmOrderItem } from './entities/order-item.entity';
import { EcmUsers } from 'src/users/entities/user.entity';
import { OrdersService } from 'src/orders/orders.service';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { CategoriesService } from 'src/categories/categories.service';
import { EcmCategory } from 'src/categories/entities/category.entity';
import { ShippingService } from 'src/shipping/shipping.service';
import { EcmShipping } from 'src/shipping/entities/shipping.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EcmProduct,
      EcmOrder,
      EcmOrderItem,
      EcmUsers,
      EcmCategory,
      EcmShipping,
    ]),
  ],
  controllers: [OrderItemsController],
  providers: [
    OrderItemsService,
    OrdersService,
    UsersService,
    ProductsService,
    CategoriesService,
    ShippingService,
  ],
})
export class OrderItemsModule {}
