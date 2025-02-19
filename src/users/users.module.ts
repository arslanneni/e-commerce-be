import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EcmUsers } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { EcmUsersRoles } from './entities/user_roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EcmUsers, EcmUsersRoles])],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
  exports: [UsersService],
})
export class UsersModule {}
