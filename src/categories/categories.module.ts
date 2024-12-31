import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { EcmCategory } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EcmProduct } from 'src/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EcmCategory, EcmProduct])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
