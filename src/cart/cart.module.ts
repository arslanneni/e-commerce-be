import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { EcmProduct } from 'src/products/entities/product.entity';
import { EcmUsers } from 'src/users/entities/user.entity';
import { EcmCart } from './entities/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { CategoriesService } from 'src/categories/categories.service';
import { EcmCategory } from 'src/categories/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EcmProduct, EcmUsers, EcmCart, EcmCategory]),
  ],
  controllers: [CartController],
  providers: [CartService, UsersService, ProductsService, CategoriesService],
})
export class CartModule {}
