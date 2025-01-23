import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('getAllCartItems')
  getAllCartItems() {
    return this.cartService.getAllCartItems();
  }
  @Get('getCartItemsByID/:ID')
  getCartItemsByID(@Param('ID') ID: number) {
    return this.cartService.getCartItemsByID(ID);
  }
  @Get('getCartItemsByUserID/:UserID')
  getCartItemsByUserID(@Param('UserID') UserID: number) {
    return this.cartService.getCartItemsByUserID(UserID);
  }
  @Post('addtoCart')
  async addtoCart(@Body() createCartDto: CreateCartDto) {
    return this.cartService.addtoCart(createCartDto);
  }
  @Put('updateCartQuantity/:cartId')
  async updateCart(
    @Param('cartId') cartId: number,
    @Body('quantity') newQuantity: number,
  ) {
    return this.cartService.updateCart(cartId, newQuantity);
  }

  @Delete('deleteCartItem/:cartId')
  async deleteCart(@Param('cartId') cartId: number) {
    return this.cartService.deleteCart(cartId);
  }
  @Get('getCartByProduct/:userId/:productId')
  async getCartByProduct(
    @Param('userId') userId: number,
    @Param('productId') productId: number,
  ) {
    return this.cartService.getCartByProduct(userId, productId);
  }
}
