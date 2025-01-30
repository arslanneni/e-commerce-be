import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsPostalCode,
  IsNumber,
} from 'class-validator';

export class CreateShippingDto {
  @IsNotEmpty()
  @IsNumber()
  @MaxLength(255)
  order_id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  country: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  city: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  state: string;

  @IsNotEmpty()
  @IsString()
  postalcode: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  address: string;

  @IsNotEmpty()
  @IsNumber()
  @MaxLength(255)
  user_id: number;
}
