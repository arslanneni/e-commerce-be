import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { EcmOrder } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EcmUsers } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(EcmOrder)
    private readonly ecmOrderRepo: Repository<EcmOrder>,
    private readonly usersService: UsersService,
  ) {}
  async getAllOrders() {
    try {
      const getAllOrders = await this.ecmOrderRepo.find({
        relations: ['ecmUsers'],
      });
      if (getAllOrders.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'All Orders Found',
          data: getAllOrders,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'No Order Found',
          data: [],
        };
      }
    } catch (err) {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'EXCEPTION OCCURRED',
        data: [],
      };
    }
  }
  async getAllPendingOrders() {
    try {
      const getAllActiveOrders = await this.ecmOrderRepo.find({
        relations: ['ecmUsers'],
        where: {
          order_status: 'pending',
        },
      });
      if (getAllActiveOrders.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'All Active Orders Found',
          data: getAllActiveOrders,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'No Order Found',
          data: [],
        };
      }
    } catch (err) {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'EXCEPTION OCCURRED',
        data: [],
      };
    }
  }
  async getAllDeliveredOrders() {
    try {
      const getAllActiveOrders = await this.ecmOrderRepo.find({
        relations: ['ecmUsers'],
        where: {
          order_status: 'done',
        },
      });
      if (getAllActiveOrders.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'All Delivered Orders Found',
          data: getAllActiveOrders,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'No Order Found',
          data: [],
        };
      }
    } catch (err) {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'EXCEPTION OCCURRED',
        data: [],
      };
    }
  }
  async getAllShippedOrders() {
    try {
      const getAllActiveOrders = await this.ecmOrderRepo.find({
        relations: ['ecmUsers'],
        where: {
          order_status: 'shipped',
        },
      });
      if (getAllActiveOrders.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'All Shipped Orders Found',
          data: getAllActiveOrders,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'No Order Found',
          data: [],
        };
      }
    } catch (err) {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'EXCEPTION OCCURRED',
        data: [],
      };
    }
  }
  async createdOrder(createOrderDto: CreateOrderDto) {
    try {
      console.log(createOrderDto);
      const isUserIDExists = await this.usersService.getUserByID(
        createOrderDto.user_id,
      );
      if (isUserIDExists.status === 'SUCCESS') {
        const saveObj = {
          order_date: new Date(),
          modified_datetime: null,
        };
        const orderResponse = await this.ecmOrderRepo.save(saveObj);
        if (orderResponse) {
          return {
            status: 'SUCCESS',
            httpcode: HttpStatus.CREATED,
            message: 'Order Placed',
            data: orderResponse,
          };
        } else {
          return {
            status: 'FAILURE',
            httpcode: HttpStatus.CONFLICT,
            message: 'Order Do Not Placed',
            data: [],
          };
        }
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'EXCEPTION OCCURRED',
          data: [],
        };
      }
    } catch (err) {
      console.log(err);
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'EXCEPTION OCCURRED',
        data: [],
      };
    }
  }
}
