import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EcmProduct } from './entities/product.entity';
import { Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(EcmProduct)
    private readonly ecmProductRepo: Repository<EcmProduct>,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    try {
      const isProductAlrExists = await this.getProductByName(
        createProductDto.name,
      );
      if (isProductAlrExists.status !== 'SUCCESS') {
        const saveObj = {
          ...createProductDto,
          datetime: new Date(),
          modified_datetime: null,
          status: 'ACTIVE',
        };
        const response = await this.ecmProductRepo.save(saveObj);
        if (response) {
          return {
            status: 'SUCCESS',
            httpcode: HttpStatus.OK,
            message: 'Product Created Successfully',
            data: response,
          };
        } else {
          return {
            status: 'FAILURE',
            httpcode: HttpStatus.CONFLICT,
            message: 'Product Does Not Created',
            data: [],
          };
        }
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.CONFLICT,
          message: 'Product Name Already Exists',
          data: [],
        };
      }
    } catch (err) {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'EXCEPTION OCCURRED',
        data: [],
      };
    }
  }
  async getProductByName(productName: string) {
    try {
      const getProduct = await this.ecmProductRepo.find({
        where: {
          name: productName,
        },
      });
      if (getProduct.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'Product Details Found',
          data: getProduct,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'Product Details Found',
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
  async getAllProducts() {
    try {
      const getProduct = await this.ecmProductRepo.find();
      if (getProduct.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'Product Details Found',
          data: getProduct,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'Product Details Found',
          data: [],
        };
      }
    } catch (err) {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'EXCEPTION OCCURRED',
        data: [],
      };
    }
  }
  async getAllActiveProducts() {
    try {
      const getProduct = await this.ecmProductRepo.find({
        where: {
          status: 'ACTIVE',
        },
      });
      if (getProduct.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'Product Details Found',
          data: getProduct,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'Product Details Found',
          data: [],
        };
      }
    } catch (err) {
      console.log(err);
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'EXCEPTION OCCURRED',
        data: [],
      };
    }
  }
  async updateProductByProductID(
    id: number,
    updateProductDto: UpdateProductDto,
  ) {
    try {
      const productResponse = await this.getProductByID(id);
      if (productResponse.status === 'SUCCESS') {
        const updObj = {
          ...updateProductDto,
          modified_datetime: new Date(),
        };
        const updateResponse = await this.ecmProductRepo.update(id, updObj);
        if (updateResponse.affected === 1) {
          return {
            status: 'SUCCESS',
            httpcode: HttpStatus.OK,
            message: 'Product Details Added',
            data: updateResponse,
          };
        } else {
          return {
            status: 'FAILURE',
            httpcode: HttpStatus.CONFLICT,
            message: 'Product Details Does Not Updated',
            data: [],
          };
        }
      }
    } catch (err) {
      console.log(err);
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'EXCEPTION OCCURRED',
        data: [],
      };
    }
  }
  async getProductByID(id: number) {
    try {
      const productResponse = await this.ecmProductRepo.find({
        where: {
          id: id,
        },
      });
      if (productResponse.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'Product Details Found',
          data: productResponse,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'Product Details Not Found',
          data: [],
        };
      }
    } catch (err) {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'EXCEPTION OCCURRED',
        data: [],
      };
    }
  }
  async deleteProductByID(id: number) {
    try {
      const productResponse = await this.getProductByID(id);
      if (productResponse.status === 'SUCCESS') {
        const updObj = {
          modified_datetime: new Date(),
          status: 'INACTIVE',
        };
        const updateResponse = await this.ecmProductRepo.update(id, updObj);
        if (updateResponse.affected === 1) {
          return {
            status: 'SUCCESS',
            httpcode: HttpStatus.OK,
            message: 'Product Deleted Successfully',
            data: updateResponse,
          };
        } else {
          return {
            status: 'FAILURE',
            httpcode: HttpStatus.CONFLICT,
            message: 'Product Does Not Deleted',
            data: [],
          };
        }
      }
    } catch (err) {
      console.log(err);
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'EXCEPTION OCCURRED',
        data: [],
      };
    }
  }
}
