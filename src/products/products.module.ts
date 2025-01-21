import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { EcmCategory } from 'src/categories/entities/category.entity';
import { EcmProduct } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { EcmCart } from 'src/cart/entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EcmCategory, EcmProduct, EcmCart])],
  controllers: [ProductsController],
  providers: [ProductsService, CategoriesService],
})
export class ProductsModule {}
