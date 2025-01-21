/**
 * ============================================================
 *                          FILE INFORMATION
 * ============================================================
 * Author       : Arslan Ali
 * Description  : Service to handle user management operations.
 * Created Date : 2024-12-30
 * Last Updated : 2024-12-30
 * Version      : 1.0.0
 * ============================================================
 */
import { HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EcmUsers } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(EcmUsers)
    private readonly ecmUsersRepo: Repository<EcmUsers>,
  ) {}

  async getAllActiveUsers() {
    try {
      const response = await this.ecmUsersRepo.find({
        where: {
          status: 'ACTIVE',
        } as unknown,
      });
      if (response.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'Active Users Found',
          data: response,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'Active Users Not Found',
          data: [],
        };
      }
    } catch (err) {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Exception Occurred',
        data: [],
      };
    }
  }
  async getAllUsers() {
    try {
      const getAllUsers = await this.ecmUsersRepo.find({
        relations: ['ecmUsersRoless'],
      });
      if (getAllUsers.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'All Users Found',
          data: getAllUsers,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'No User Found',
          data: [],
        };
      }
    } catch (err) {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Exception Occurred',
        data: [],
      };
    }
  }
  async getUserByUserID(userID: string) {
    try {
      const getUsersData = await this.ecmUsersRepo.find({
        where: {
          user_id: userID,
        } as unknown,
      });
      if (getUsersData.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'User Details Found',
          data: getUsersData,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'Users Details Not Found',
          data: [],
        };
      }
    } catch (err) {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Exception Occurred',
        data: [],
      };
    }
  }
  async getUserByID(UserID: number) {
    try {
      console.log(UserID, 'UserID');
      const getUsersData = await this.ecmUsersRepo.find({
        where: {
          id: UserID,
        } as unknown,
      });
      console.log(getUsersData, 'getUsersData');
      if (getUsersData.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'User Details Found',
          data: getUsersData,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'Users Details Not Found',
          data: [],
        };
      }
    } catch (err) {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Exception Occurred',
        data: [],
      };
    }
  }
  async findUserByEmail(email: string) {
    try {
      const getUsersData = await this.ecmUsersRepo.find({
        where: {
          email: email,
        } as unknown,
      });
      if (getUsersData.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'User Details Found',
          data: getUsersData,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'Users Details Not Found',
          data: [],
        };
      }
    } catch (err) {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Exception Occurred',
        data: [],
      };
    }
  }
  async isUserAlrExists(email: string) {
    try {
      const getUsersData = await this.ecmUsersRepo.find({
        where: {
          email: email,
        } as unknown,
      });
      if (getUsersData.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'User Details Found',
          data: getUsersData,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'User Does Not Exists',
          data: [],
        };
      }
    } catch (err) {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Exception Occurred',
        data: [],
      };
    }
  }
  async updateUserByEmail(email: string, updateUserDto: UpdateUserDto) {
    try {
      const date = new Date();
      const { password } = updateUserDto;
      const hashedPassword = await bcrypt.hash(password, 10);

      const isUserFound = await this.ecmUsersRepo.find({
        where: {
          email: email,
        },
      });

      if (isUserFound.length > 0) {
        const updateFields = {
          ...updateUserDto,
          modified_datetime: date,
        };
        if (hashedPassword) {
          updateFields.password = hashedPassword;
        }

        const updatedUser = await this.ecmUsersRepo.update(
          isUserFound[0].id,
          updateFields,
        );
        if (updatedUser.affected === 1) {
          return {
            status: 'SUCCESS',
            httpcode: HttpStatus.OK,
            message: 'User Updated Successfully',
            data: updatedUser,
          };
        } else {
          return {
            status: 'FAILURE',
            httpcode: HttpStatus.CONFLICT,
            message: 'User Does Not Updated',
            data: [],
          };
        }
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'User Does Not Exists',
          data: [],
        };
      }
    } catch (err) {
      console.log(err);
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Exception Occurred',
        data: [],
      };
    }
  }
  async deleteUserByEmail(email: string, updateUserDto: UpdateUserDto) {
    try {
      const date = new Date();

      const isUserFound = await this.ecmUsersRepo.find({
        where: {
          email: email,
        },
      });

      if (isUserFound.length > 0) {
        const updateFields = {
          ...updateUserDto,
          modified_datetime: date,
          status: 'INACTIVE',
        };

        const updatedUser = await this.ecmUsersRepo.update(
          isUserFound[0].id,
          updateFields,
        );
        if (updatedUser.affected === 1) {
          return {
            status: 'SUCCESS',
            httpcode: HttpStatus.OK,
            message: 'User Deleted Successfully',
            data: updatedUser,
          };
        } else {
          return {
            status: 'FAILURE',
            httpcode: HttpStatus.CONFLICT,
            message: 'User Does Not Deleted',
            data: [],
          };
        }
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'User Does Not Exists',
          data: [],
        };
      }
    } catch (err) {
      console.log(err);
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Exception Occurred',
        data: [],
      };
    }
  }
}
