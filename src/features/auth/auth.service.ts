import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { compareHash, generateHash } from 'src/shared';
import { UserDocument, UserModel } from '../user/models/user.schema';
import { UserRole } from '../user/interfaces/roles.interface';
import { ethers } from 'ethers';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CloudinaryService } from 'src/shared/modules/cloudinary.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { SessionDocument, SessionModel } from '../user/models/session.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(SessionModel.name) private readonly sessionModel: Model<SessionDocument>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly jwtService: JwtService,
  ) {}
  private blacklist: Set<string> = new Set();

  public async login(userLoginBody: LoginAuthDto) {
    const { email, password } = userLoginBody;

    try {
      if (!email || !password) {
        throw new HttpException('Email and password are required', HttpStatus.BAD_REQUEST);
      }

      const userExist = await this.userModel.findOne({ email });

      if (!userExist) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      if (!userExist.password) {
        throw new HttpException('Password not set for this user', HttpStatus.BAD_REQUEST);
      }

      const isCheck = await compareHash(password, userExist.password);
      if (!isCheck) {
        throw new HttpException('Invalid password', HttpStatus.CONFLICT);
      }

      const userFlat = userExist.toObject();
      delete userFlat.password;

      const payload = { id: userFlat._id };
      const token = this.jwtService.sign(payload);

      const data = { token, user: userFlat };

      return data;
    } catch (error) {
      console.error('Error during login:', error);
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // public async register(userBody: RegisterAuthDto) {
  //   const { password, email, fullname, terminos, profilePicture, mobile } = userBody;
  //   const hashedPassword = await generateHash(password);

  //   const userParse = {
  //     email,
  //     fullname,
  //     password: hashedPassword,
  //     terminos,
  //     profilePicture: profilePicture || 'https://placehold.co/330x220?text=Profile+Image',
  //     mobile,
  //     isEmailVerified: false,
  //   };

  //   const existingUser = await this.userModel.findOne({ email });
  //   if (existingUser) {
  //     throw new HttpException('EMAIL_ALREADY_EXISTS', HttpStatus.CONFLICT);
  //   }

  //   const newUser = await this.userModel.create(userParse);

  //   let walletAddress: string;
  //   let walletPrivateKey: string;

  //   try {
  //     const wallet = ethers.Wallet.createRandom();
  //     walletAddress = wallet.address;
  //     walletPrivateKey = wallet.privateKey;
  //   } catch (error) {
  //     console.log(error);
  //     walletAddress = `pseudo_${Math.random().toString(36).substring(2, 15)}`;
  //     walletPrivateKey = `pseudo_${Math.random().toString(36).substring(2, 15)}`;
  //   }

  //   newUser.walletAddress = walletAddress;
  //   newUser.walletPrivateKey = walletPrivateKey;

  //   await newUser.save();

  //   const payload = { id: newUser._id, roles: [UserRole.USER] };
  //   const token = this.jwtService.sign(payload);

  //   return { user: newUser, token };
  // }
  public async register(userBody: RegisterAuthDto) {
    const { password, email, fullname, lastname, countryCode, terminos, profilePicture, mobile } = userBody;
    const hashedPassword = await generateHash(password);

    const userParse = {
      email,
      fullname,
      lastname,
      countryCode,
      password: hashedPassword,
      terminos,
      profilePicture: profilePicture || 'https://placehold.co/330x220?text=Profile+Image',
      mobile,
      isEmailVerified: false,
      roles: [UserRole.USER],
      username: '', // valor por defecto, puedes cambiarlo
      country: '', // valor por defecto, puedes cambiarlo
      browserName: '', // valor por defecto, puedes cambiarlo
      deviceType: '', // valor por defecto, puedes cambiarlo
      emailVerificationToken: '', // valor por defecto, puedes cambiarlo
      refreshToken: '', // valor por defecto, puedes cambiarlo
      company: '', // valor por defecto, puedes cambiarlo
      contactPhone: '', // valor por defecto, puedes cambiarlo
      companySite: '', // valor por defecto, puedes cambiarlo
      communication: [], // valor por defecto, puedes cambiarlo
      allowChanges: false, // valor por defecto, puedes cambiarlo
      language: '', // valor por defecto, puedes cambiarlo
      timeZone: '', // valor por defecto, puedes cambiarlo
      currency: '', // valor por defecto, puedes cambiarlo
      allowMarketing: false, // valor por defecto, puedes cambiarlo
    };

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new HttpException('EMAIL_ALREADY_EXISTS', HttpStatus.CONFLICT);
    }

    const newUser = await this.userModel.create(userParse);

    let walletAddress: string;
    let walletPrivateKey: string;

    try {
      const wallet = ethers.Wallet.createRandom();
      walletAddress = wallet.address;
      walletPrivateKey = wallet.privateKey;
    } catch (error) {
      console.log(error);
      walletAddress = `pseudo_${Math.random().toString(36).substring(2, 15)}`;
      walletPrivateKey = `pseudo_${Math.random().toString(36).substring(2, 15)}`;
    }

    newUser.walletAddress = walletAddress;
    newUser.walletPrivateKey = walletPrivateKey;

    await newUser.save();

    const payload = { id: newUser._id, roles: [UserRole.USER] };
    const token = this.jwtService.sign(payload);

    return { user: newUser, token };
  }
  public async currentUser(token: string) {
    try {
      const decodedToken = this.jwtService.verify(token);
      const userId = decodedToken.id;

      const user = await this.userModel.findById(userId).select('-password -walletPrivateKey');
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (error) {
      console.error('Error retrieving current user:', error);
      throw new HttpException('Invalid token or user not found', HttpStatus.UNAUTHORIZED);
    }
  }

  public async logout(token: string, userId: string) {
    try {
      this.blacklist.add(token);
      await this.sessionModel.deleteMany({ userId });
      return { message: 'Logged out successfully' };
    } catch (error) {
      console.error('Error during logout:', error);
      throw new HttpException('Error during logout', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async isTokenBlacklisted(token: string): Promise<boolean> {
    try {
      return this.blacklist.has(token);
    } catch (error) {
      console.error('Error checking token blacklist:', error);
      throw new HttpException('Error checking token blacklist', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async updatePassword(updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword, userId } = updatePasswordDto;

    try {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const isOldPasswordValid = await compareHash(oldPassword, user.password);
      if (!isOldPasswordValid) {
        throw new HttpException('Invalid old password', HttpStatus.CONFLICT);
      }

      const hashedNewPassword = await generateHash(newPassword);
      user.password = hashedNewPassword;

      await user.save();

      return { message: 'Password updated successfully' };
    } catch (error) {
      console.error('Error updating password:', error);
      throw new HttpException(error.message || 'Error updating password', error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async verifyEmail(token: string) {
    try {
      const user = await this.userModel.findOne({ emailVerificationToken: token });
      if (!user) {
        throw new HttpException('Invalid verification token', HttpStatus.BAD_REQUEST);
      }

      user.isEmailVerified = true;
      user.emailVerificationToken = null;

      await user.save();

      return { message: 'Email verified successfully' };
    } catch (error) {
      console.error('Error verifying email:', error);
      throw new HttpException(error.message || 'Error verifying email', error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // public async refreshToken(refreshToken: string) {
  //   try {
  //     const payload = this.jwtService.verify(refreshToken);
  //     const user = await this.userModel.findById(payload.id);
  //     if (!user) {
  //       throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
  //     }

  //     const newPayload = { id: user._id, roles: user.roles };
  //     const newToken = this.jwtService.sign(newPayload);

  //     return { token: newToken };
  //   } catch (error) {
  //     console.error('Error refreshing token:', error);
  //     throw new HttpException(error.message || 'Error refreshing token', error.status || HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  public async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.userModel.findById(payload.id);
      if (!user) {
        throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
      }

      const newPayload = { id: user._id, roles: user.roles };
      const newToken = this.jwtService.sign(newPayload);

      return { token: newToken };
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw new HttpException(error.message || 'Error refreshing token', error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getSessions(userId: string) {
    try {
      const sessions = await this.sessionModel.find({ userId });
      return sessions;
    } catch (error) {
      console.error('Error getting sessions:', error);
      throw new HttpException('Error getting sessions', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async deleteSession(sessionId: string) {
    try {
      await this.sessionModel.findByIdAndDelete(sessionId);
      return { message: 'Session deleted successfully' };
    } catch (error) {
      console.error('Error deleting session:', error);
      throw new HttpException('Error deleting session', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
