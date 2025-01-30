import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}
  @Post('createShipping')
  create(@Body() createShippingDto: CreateShippingDto) {
    return this.shippingService.createShipping(createShippingDto);
  }
  @Get('getShippingDetails/:userID')
  getShippingDetails(@Param('userID') userID: number) {
    return this.shippingService.getShippingDetails(userID);
  }
}
