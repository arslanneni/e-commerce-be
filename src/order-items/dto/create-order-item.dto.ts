import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsNumber,
  MaxLength,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { ProductDto } from './product-dto';
import { Type } from 'class-transformer';

export class CreateOrderItemsDto {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  postalcode: string;
}
