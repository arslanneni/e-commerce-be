import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { EcmCategory } from 'src/categories/entities/category.entity';
import { EcmProduct } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EcmCategory, EcmProduct])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
