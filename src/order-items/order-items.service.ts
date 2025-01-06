import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EcmOrderItem } from './entities/order-item.entity';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(EcmOrderItem)
    private readonly ecmOrderItemRepo: Repository<EcmOrderItem>,
  ) {}
  async getAllOrderItems() {
    try {
      const getAllOrderItems = await this.ecmOrderItemRepo.find({
        relations: ['ecmOrders', 'ecmProducts'],
      });
      if (getAllOrderItems.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'Order Items Found',
          data: getAllOrderItems,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'Order Items Not Found',
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
}
