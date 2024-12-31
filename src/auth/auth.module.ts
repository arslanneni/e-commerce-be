import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EcmUsers } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([EcmUsers]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, EcmUsers, UsersService, AuthGuard],
  exports: [AuthService],
})
export class AuthModule {
  constructor() {}
}
