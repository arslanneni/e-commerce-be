/**
 * ============================================================
 *                          FILE INFORMATION
 * ============================================================
 * Author       : Arslan Ali
 * Description  : Service to handle user authentication operations.
 * Created Date : 2024-12-30
 * Last Updated : 2024-12-30
 * Version      : 1.0.0
 * ============================================================
 */
import * as bcrypt from 'bcrypt';
import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { LoginAuthDto } from '../auth/dto/login-auth.dto';
import { EcmUsers } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userServiceRepo: UsersService,
    @InjectRepository(EcmUsers)
    private readonly ecmUsersRepo: Repository<EcmUsers>,
  ) {}

  async signupUser(createAuthDto: CreateAuthDto) {
    try {
      const isUserExists = await this.ecmUsersRepo.find({
        where: {
          email: createAuthDto.email,
        } as unknown,
      } as unknown);

      if (isUserExists.length > 0) {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.CONFLICT,
          message: 'Email Already Registered',
          data: [],
        };
      } else {
        const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);

        const newUser = this.ecmUsersRepo.create({
          ...createAuthDto,
          password: hashedPassword,
          datetime: new Date(),
          modified_datetime: null,
          status: 'ACTIVE',
        });

        // Save the new user
        const savedUser = await this.ecmUsersRepo.save(newUser);

        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.CREATED,
          message: 'Signup Successful',
          data: savedUser,
        };
      }
    } catch (err) {
      console.error('Error during user creation:', err);
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Exception Occurred',
        data: [],
      };
    }
  }

  async loginUser(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;

    const user = await this.userServiceRepo.isUserAlrExists(email);
    console.log(user);
    if (
      user &&
      user['status'] === 'SUCCESS' &&
      user['data'] &&
      user['data'].length > 0
    ) {
      const storedPasswordHash = user['data'][0]['password'];

      try {
        const isPasswordValid = await bcrypt.compare(
          password,
          storedPasswordHash,
        );

        if (isPasswordValid) {
          const token = this.generateToken({
            user_id: user['data'][0]['user_id'],
            username: user['data'][0]['username'],
          });

          return {
            status: 'SUCCESS',
            message: 'Login successful',
            data: {
              user: user['data'][0],
              token,
            },
          };
        } else {
          console.log('Invalid password');
          return {
            status: 'FAILURE',
            message: 'Invalid credentials',
            data: [],
          };
        }
      } catch (err) {
        return {
          status: 'FAILURE',
          message: 'Internal server error',
          data: [],
        };
      }
    } else {
      return {
        status: 'FAILURE',
        message: 'User not found',
        data: [],
      };
    }
  }

  private generateToken(user: { user_id: string; username: string }) {
    const payload = { user_id: user.user_id, username: user.username };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
    });
  }
}
