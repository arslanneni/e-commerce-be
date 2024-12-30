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
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('getAllActiveUsers')
  getAllActiveUsers() {
    return this.usersService.getAllActiveUsers();
  }
  @Get('getAllUsers')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('getUserByUserID/:userID')
  getUserByUserID(@Param('userID') userID: string) {
    return this.usersService.getUserByUserID(userID);
  }
  @Put('updateUserByEmail/:email')
  updateUserByEmail(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUserByEmail(email, updateUserDto);
  }

  @Put('deleteUserByEmail/:email')
  deleteUserByEmail(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.deleteUserByEmail(email, updateUserDto);
  }
}