import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EcmOrder } from './entities/order.entity';
import { EcmProduct } from 'src/products/entities/product.entity';
import { UsersService } from 'src/users/users.service';
import { EcmUsers } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EcmOrder, EcmProduct, EcmUsers])],
  controllers: [OrdersController],
  providers: [OrdersService, UsersService],
})
export class OrdersModule {}
