import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signupUser')
  async signupUser(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signupUser(createAuthDto);
  }

  // @Post('createUser')
  // async createUser(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.createUser(createAuthDto);
  // }

  @Post('loginUser')
  async loginUser(@Body() loginAuthDto: LoginAuthDto) {
    return await this.authService.loginUser(loginAuthDto);
  }
}
