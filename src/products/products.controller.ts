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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('createProduct')
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }
  @Get('getAllActiveProducts')
  getAllActiveProducts() {
    return this.productsService.getAllActiveProducts();
  }
  @Get('getAllProducts')
  getAllProducts() {
    return this.productsService.getAllProducts();
  }
  @Put('updateProductByProductID/:id')
  updateProductByProductID(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProductByProductID(id, updateProductDto);
  }

  @Put('deleteProductByID/:id')
  deleteProductByID(@Param('id') id: number) {
    return this.productsService.deleteProductByID(id);
  }
}
