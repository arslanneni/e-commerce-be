import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EcmOrderItem } from './entities/order-item.entity';
import { OrdersService } from 'src/orders/orders.service';
import { CreateOrderItemsDto } from './dto/create-order-item.dto';
import { ProductsService } from 'src/products/products.service';
import { ShippingService } from 'src/shipping/shipping.service';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(EcmOrderItem)
    private readonly ecmOrderItemRepo: Repository<EcmOrderItem>,
    private readonly ecmorderService: OrdersService,
    private readonly ecmProductService: ProductsService,
    private readonly ecmShippingService: ShippingService,
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

  async createOrderItems(createOrderItems: CreateOrderItemsDto) {
    try {
      const isOrderExists = await this.ecmorderService.getOrderByUSERID(
        createOrderItems.user_id,
      );

      if (isOrderExists.status !== 'SUCCESS' || !isOrderExists.data.length) {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'Order Not Found',
          data: [],
        };
      }

      const order_id = isOrderExists.data[0].id;

      const productChecks = await Promise.all(
        createOrderItems.products.map((product) =>
          this.ecmProductService.getProductByID(product.product_id),
        ),
      );

      const validProducts = productChecks
        .map((result, index) =>
          result.status === 'SUCCESS'
            ? { ...createOrderItems.products[index], order_id }
            : null,
        )
        .filter(Boolean);

      if (validProducts.length === 0) {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'No valid products found',
          data: [],
        };
      }

      const orderItemsResponse =
        await this.ecmOrderItemRepo.save(validProducts);
      if (orderItemsResponse) {
        const saveShipping = await this.ecmShippingService.createShipping({
          order_id: order_id,
          country: createOrderItems.country,
          city: createOrderItems.city,
          state: createOrderItems.state,
          postalcode: createOrderItems.postalcode,
          address: createOrderItems.address,
          user_id: createOrderItems.user_id,
        });
        if (saveShipping) {
          return {
            status: 'SUCCESS',
            httpcode: HttpStatus.CREATED,
            message: 'Order has been placed successfully',
            data: validProducts,
          };
        }
      }
    } catch (err) {
      console.error(err);
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Exception Occurred',
        data: [],
      };
    }
  }
}
