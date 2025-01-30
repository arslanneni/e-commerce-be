import { Module } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import { EcmShipping } from './entities/shipping.entity';
import { EcmOrder } from 'src/orders/entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from 'src/orders/orders.service';
import { UsersService } from 'src/users/users.service';
import { EcmUsers } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EcmOrder, EcmShipping, EcmUsers])],
  controllers: [ShippingController],
  providers: [ShippingService, OrdersService, UsersService],
})
export class ShippingModule {}
