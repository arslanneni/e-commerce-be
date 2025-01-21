import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
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
  @Get('getLatestProducts')
  getLatestProducts() {
    return this.productsService.getLatestProducts();
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
  @Get('getProductDetailsByID/:id')
  getProductDetailsByID(@Param('id') id: number) {
    return this.productsService.getProductDetailsByID(id);
  }

  @Put('deleteProductByID/:id')
  deleteProductByID(@Param('id') id: number) {
    return this.productsService.deleteProductByID(id);
  }

  @Get('getAllProductsByCategory/:category')
  getAllProductsByCategory(@Param('category') category: string) {
    return this.productsService.getAllProductsByCategory(category);
  }
  @Get('getAllActiveProductsByCategory/:category')
  getAllActiveProductsByCategory(@Param('category') category: string) {
    return this.productsService.getAllActiveProductsByCategory(category);
  }
}
