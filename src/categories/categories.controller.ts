import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('createCategory')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  }
  @Get('getAllCategories')
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }
  @Get('getActiveCategories')
  getActiveCategories() {
    return this.categoriesService.getActiveCategories();
  }
  @Get('getCategoryByID/:ID')
  getCategoryByID(@Param('ID') ID: number) {
    return this.categoriesService.getCategoryByID(ID);
  }
  @Get('getCategoryByName/:name')
  getCategoryByName(@Param('name') name: string) {
    return this.categoriesService.getCategoryByName(name);
  }
  @Put('updateCategory/:ID')
  updateCategory(
    @Param('ID') ID: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(ID, updateCategoryDto);
  }
  @Put('deleteCategory/:ID')
  deleteCategory(@Param('ID') ID: number) {
    return this.categoriesService.deleteCategory(ID);
  }
}
