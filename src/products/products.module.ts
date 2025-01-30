import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { EcmCategory } from 'src/categories/entities/category.entity';
import { EcmProduct } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { EcmCart } from 'src/cart/entities/cart.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { EcmUsers } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EcmCategory, EcmProduct, EcmCart, EcmUsers]),
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    CategoriesService,
    AuthService,
    JwtService,
    UsersService,
  ],
})
export class ProductsModule {}
