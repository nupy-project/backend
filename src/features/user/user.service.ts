import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserModel } from './models/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel.name) private readonly userModel: Model<UserDocument>) {}

  public async getUserProfile(userId: string) {
    try {
      const user = await this.userModel.findById(userId).select('-password -walletPrivateKey');
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw new HttpException('Error getting user profile', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async updateUserProfile(userId: string, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true }).select('-password -walletPrivateKey');
      if (!updatedUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return updatedUser;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw new HttpException('Error updating user profile', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async deleteUser(userId: string) {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(userId);
      if (!deletedUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'User deleted successfully' };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new HttpException('Error deleting user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async listUsers(page: number, limit: number) {
    try {
      const users = await this.userModel.find().select('-password -walletPrivateKey').skip((page - 1) * limit).limit(limit);
      const totalUsers = await this.userModel.countDocuments();
      return { users, total: totalUsers, page, limit };
    } catch (error) {
      console.error('Error listing users:', error);
      throw new HttpException('Error listing users', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async searchUsers(searchUserDto: SearchUserDto) {
    try {
      const query: any = {};
      if (searchUserDto.email) {
        query.email = searchUserDto.email;
      }
      if (searchUserDto.username) {
        query.username = searchUserDto.username;
      }

      const users = await this.userModel.find(query).select('-password -walletPrivateKey');
      return users;
    } catch (error) {
      console.error('Error searching users:', error);
      throw new HttpException('Error searching users', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
