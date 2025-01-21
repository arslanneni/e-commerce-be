/**
 * ============================================================
 *                          FILE INFORMATION
 * ============================================================
 * Author       : Arslan Ali
 * Description  : Service to handle Products Categories.
 * Created Date : 2024-12-30
 * Last Updated : 2024-12-30
 * Version      : 1.0.0
 * ============================================================
 */

import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { EcmCategory } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(EcmCategory)
    private readonly ecmCategoryRepo: Repository<EcmCategory>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    try {
      const isCategoryAlrExists = await this.ecmCategoryRepo.find({
        where: {
          name: createCategoryDto.name,
        },
      });
      if (isCategoryAlrExists.length > 0) {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.CONFLICT,
          message: 'Category Already Exists',
          data: [],
        };
      } else {
        const saveObj = {
          ...createCategoryDto,
          status: 'ACTIVE',
          datetime: new Date(),
          modified_datetime: null,
        };
        const categoryResponse = await this.ecmCategoryRepo.save(saveObj);
        if (categoryResponse) {
          return {
            status: 'SUCCESS',
            httpcode: HttpStatus.CREATED,
            message: 'Category Added Successfully',
            data: categoryResponse,
          };
        } else {
          return {
            status: 'SUCCESS',
            httpcode: HttpStatus.CREATED,
            message: 'Category Added Successfully',
            data: categoryResponse,
          };
        }
      }
    } catch (err) {
      console.log(err);
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Exception Occurred',
        data: [],
      };
    }
  }

  async getAllCategories() {
    try {
      const categoriesResult = await this.ecmCategoryRepo.find({});
      if (categoriesResult.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'All Categories Found',
          data: categoriesResult,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'No Category Found',
          data: [],
        };
      }
    } catch (err) {
      console.log(err);
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Exception Occurred',
        data: [],
      };
    }
  }
  async getActiveCategories() {
    try {
      const categoriesResult = await this.ecmCategoryRepo.find({
        where: {
          status: 'ACTIVE',
        },
      });
      if (categoriesResult.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'All Active Categories Found',
          data: categoriesResult,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'No Category Found',
          data: [],
        };
      }
    } catch (err) {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Exception Occurred',
        data: [],
      };
    }
  }
  async getCategoryByID(id: number) {
    try {
      const getCategoryResponse = await this.ecmCategoryRepo.find({
        where: {
          id: id,
        },
      });
      if (getCategoryResponse.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'Category Found',
          data: getCategoryResponse,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'No Category Found',
          data: [],
        };
      }
    } catch (err) {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Exception Occurred',
        data: [],
      };
    }
  }
  async getCategoryByName(name: string) {
    try {
      const getCategoryResponse = await this.ecmCategoryRepo.find({
        where: {
          name: name,
        },
      });
      if (getCategoryResponse.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'Category Found',
          data: getCategoryResponse,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'No Category Found',
          data: [],
        };
      }
    } catch (err) {
      console.log(err);
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Exception Occurred',
        data: [],
      };
    }
  }
  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const isCategoryExists = await this.getCategoryByID(id);
      if (isCategoryExists.status === 'SUCCESS') {
        const updCategoryObj = {
          ...updateCategoryDto,
          modified_datetime: new Date(),
        };
        const updateCategoryResult = await this.ecmCategoryRepo.update(
          id,
          updCategoryObj,
        );
        if (updateCategoryResult.affected === 1) {
          return {
            status: 'SUCCESS',
            httpcode: HttpStatus.OK,
            message: 'Category Updated Successfully',
            data: updateCategoryResult,
          };
        } else {
          return {
            status: 'FAILURE',
            httpcode: HttpStatus.CONFLICT,
            message: 'Category Does Not Updated',
            data: [],
          };
        }
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'No Category Found',
          data: [],
        };
      }
    } catch (err) {
      console.log(err);
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Exception Occurred',
        data: [],
      };
    }
  }
  async deleteCategory(id: number) {
    try {
      const response = await this.getCategoryByID(id);
      if (response.status === 'SUCCESS') {
        const updObj = {
          modified_datetime: new Date(),
          status: 'INACTIVE',
        };
        const updResponse = await this.ecmCategoryRepo.update(id, updObj);
        if (updResponse.affected === 1) {
          return {
            status: 'SUCCESS',
            httpcode: HttpStatus.OK,
            message: 'Category Deleted Successfully',
            data: updResponse,
          };
        } else {
          return {
            status: 'FAILURE',
            httpcode: HttpStatus.CONFLICT,
            message: 'Category Does Not Deleted',
            data: [],
          };
        }
      }
    } catch (err) {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Exception Occurred',
        data: [],
      };
    }
  }
}
