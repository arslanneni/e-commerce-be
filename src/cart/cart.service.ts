import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { EcmCart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EcmProduct } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(EcmCart)
    private readonly ecmCartRepo: Repository<EcmCart>,
    private readonly ecmProductService: ProductsService,
    private readonly ecmUsersService: UsersService,
  ) {}

  async getAllCartItems() {
    try {
      const cartResponse = await this.ecmCartRepo.find({
        relations: ['ecmUserss', 'ecmProducts'],
      });

      if (cartResponse.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.OK,
          message: 'Cart Details Found',
          data: cartResponse,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'Cart Details Not Found',
          data: [],
        };
      }
    } catch (err) {
      console.error('Error fetching cart items:', err);
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Exception Occured',
        data: [],
      };
    }
  }
  async getCartItemsByID(id: number) {
    try {
      const cartResponse = await this.ecmCartRepo.find({
        relations: ['ecmUserss', 'ecmProducts'],
        where: {
          id: id,
        },
      });

      if (cartResponse.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.OK,
          message: 'Cart Details Found',
          data: cartResponse,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'Cart Details Not Found',
          data: [],
        };
      }
    } catch (err) {
      console.error('Error fetching cart items:', err);
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Exception Occured',
        data: [],
      };
    }
  }
  async getCartItemsByUserID(UserID: number) {
    try {
      const cartResponse = await this.ecmCartRepo.find({
        relations: ['ecmUserss', 'ecmProducts'],
        where: {
          ecmUserss: {
            id: UserID,
          },
        },
      });

      if (cartResponse.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.OK,
          message: 'Cart Details Found',
          data: cartResponse,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'Cart Details Not Found',
          data: [],
        };
      }
    } catch (err) {
      console.error('Error fetching cart items:', err);
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Exception Occured',
        data: [],
      };
    }
  }
  async addtoCart(createCartDto: CreateCartDto) {
    try {
      const cartResponse = await this.ecmCartRepo.find({
        where: {
          product_id: createCartDto.product_id,
          user_id: createCartDto.user_id,
        },
      });

      if (cartResponse.length > 0) {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.CONFLICT,
          message: 'Product Already Been Added To Cart',
          data: [],
        };
      } else {
        const isUserExsits = await this.ecmUsersService.getUserByID(
          createCartDto.user_id,
        );
        if (isUserExsits.status === 'SUCCESS') {
          const productExists = await this.ecmProductService.getProductByID(
            createCartDto.product_id,
          );
          if (productExists.status === 'SUCCESS') {
            const saveResponse = await this.ecmCartRepo.save(createCartDto);
            if (saveResponse) {
              return {
                status: 'SUCCESS',
                httpcode: HttpStatus.CREATED,
                message: 'Product Added To Cart Successfully',
                data: saveResponse,
              };
            } else {
              return {
                status: 'FAILURE',
                httpcode: HttpStatus.CONFLICT,
                message: 'Product Does Not Added To Cart',
                data: [],
              };
            }
          } else {
            return {
              status: 'FAILURE',
              httpcode: HttpStatus.NOT_FOUND,
              message: 'Product Does Not Exists',
              data: [],
            };
          }
        } else {
          return {
            status: 'FAILURE',
            httpcode: HttpStatus.NOT_FOUND,
            message: 'User Does Not Exists',
            data: [],
          };
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  async updateCart(cartId: number, newQuantity: number) {
    try {
      const cartItem = await this.ecmCartRepo.findOne({
        where: { id: cartId },
      });

      if (!cartItem) {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'Cart Item Not Found',
          data: [],
        };
      }

      if (newQuantity <= 0) {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.BAD_REQUEST,
          message: 'Quantity Must Be Greater Than Zero',
          data: [],
        };
      }

      cartItem.quantity = newQuantity;
      const updatedCartItem = await this.ecmCartRepo.save(cartItem);

      return {
        status: 'SUCCESS',
        httpcode: HttpStatus.OK,
        message: 'Cart Updated Successfully',
        data: updatedCartItem,
      };
    } catch (err) {
      console.log(err);
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An Error Occurred While Updating Cart',
        data: [],
      };
    }
  }
  async deleteCart(cartId: number) {
    try {
      const cartItem = await this.ecmCartRepo.findOne({
        where: { id: cartId },
      });

      if (!cartItem) {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'Cart Item Not Found',
          data: [],
        };
      }

      await this.ecmCartRepo.remove(cartItem);

      return {
        status: 'SUCCESS',
        httpcode: HttpStatus.OK,
        message: 'Cart Item Deleted Successfully',
        data: [],
      };
    } catch (err) {
      console.log(err);
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An Error Occurred While Deleting Cart',
        data: [],
      };
    }
  }
}
