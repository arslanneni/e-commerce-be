import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  product_id: number;
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity: number;
}
