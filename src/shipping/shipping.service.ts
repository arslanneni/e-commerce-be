import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { EcmShipping } from './entities/shipping.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EcmOrder } from 'src/orders/entities/order.entity';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class ShippingService {
  constructor(
    @InjectRepository(EcmShipping)
    private readonly ecmShippingRepo: Repository<EcmShipping>,

    private readonly ordersService: OrdersService,
  ) {}
  async createShipping(createShippingDto: CreateShippingDto) {
    try {
      const isOrderExists = await this.ordersService.getOrderByOrderID(
        createShippingDto.order_id,
      );

      if (isOrderExists.status === 'SUCCESS') {
        const updCategoryObj = {
          ...createShippingDto,
          shipping_date: new Date(),
          shipping_status: 'Pending',
        };
        const savedShipping = await this.ecmShippingRepo.save(updCategoryObj);
        if (savedShipping) {
          return {
            status: 'SUCCESS',
            httpcode: HttpStatus.CREATED,
            message: 'Shipping Details Saved Successfully',
            data: savedShipping,
          };
        }
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'Order Does Not Exist',
          data: [],
        };
      }
    } catch (err) {
      console.log(err);
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Exception Occurred',
        data: [],
      };
    }
  }
  async getShippingDetails(userID: number) {
    try {
      const shippingResponse = await this.ecmShippingRepo.find({
        relations: ['ecmOrderr.ecmOrderItems.ecmProducts'],
        where: {
          user_id: userID,
        },
      });
      if (shippingResponse.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.CREATED,
          message: 'Shipping Details Found',
          data: shippingResponse,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'No Order Has Been Placed',
          data: [],
        };
      }
    } catch (err) {
      console.log(err);
    }
  }
}
