import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsNumber,
  MaxLength,
} from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  order_status: string;

  @IsNotEmpty()
  @IsNumber()
  total_amount: number;
}
