import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { compareHash, envs, generateHash, loadJSON } from 'src/shared';
import { UserDocument, UserModel } from '../user/models/user.schema';
import { Seller, SellerDocument } from '../seller/model/seller.scheme';
import { UserRole } from '../user/interfaces/roles.interface';
import { ethers } from 'ethers';

@Injectable()
export class AuthService {
  private provider: ethers.providers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private contract: ethers.Contract;
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(UserModel.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Seller.name) private readonly sellerModel: Model<SellerDocument>,
  ) {
    this.provider = new ethers.providers.JsonRpcProvider(envs.ETH_RPC_URL);
    this.wallet = new ethers.Wallet(envs.PRIVATE_KEY, this.provider);

    const contractAddress = envs.COMMISSION_MANAGER_ADDRESS;
    const contractABI = loadJSON().CommissionManager.abi;
    this.contract = new ethers.Contract(contractAddress, contractABI, this.wallet);
  }


  public async login(userLoginBody: LoginAuthDto) {
    const { password } = userLoginBody;

    const userExist = await this.userModel.findOne({ email: userLoginBody.email });
    if (!userExist) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

    const isCheck = await compareHash(password, userExist.password);
    if (!isCheck) throw new HttpException('PASSWORD_INVALID', HttpStatus.CONFLICT);

    const userFlat = userExist.toObject();
    delete userFlat.password;

    const payload = { id: userFlat._id, roles: userFlat.roles };

    const token = this.jwtService.sign(payload);

    const data = { token, user: userFlat };

    return data;
  }


  public async registerSeller(userBody: RegisterAuthDto, role: UserRole) {
    const { password, email, ...user } = userBody;
    const userParse = { ...user, email, password: await generateHash(password), roles: [role] };

    const existingUser = await this.userModel.findOne({ email: email });
    if (existingUser) {
      throw new HttpException('EMAIL_ALREADY_EXISTS', HttpStatus.CONFLICT);
    }

    const newUser = await this.userModel.create(userParse);

    if (role === UserRole.Seller) {
      let walletAddress: string;
      let walletPrivateKey: string;

      try {
        const wallet = ethers.Wallet.createRandom();
        walletAddress = wallet.address;
        walletPrivateKey = wallet.privateKey;
      } catch (error) {
        // Generar una "pseudo wallet" en caso de error
        walletAddress = `pseudo_${Math.random().toString(36).substring(2, 15)}`;
        walletPrivateKey = `pseudo_${Math.random().toString(36).substring(2, 15)}`;
      }

      await this.sellerModel.create({
        user: newUser._id,
        email: email, // Asegurarse de que se establece el email
        walletAddress,
        walletPrivateKey, // Omitir guardar la privateKey si no es necesario
        // Otros campos específicos del seller desde userParse
      });
    }

    const payload = { id: newUser._id, roles: newUser.roles };
    const token = this.jwtService.sign(payload);

    return { user: newUser, token };
  }
  public async registerBuyer(userBody: RegisterAuthDto, role: UserRole) {
    const { password, email, ...user } = userBody;
    const userParse = { ...user, email, password: await generateHash(password), roles: [role] };

    const existingUser = await this.userModel.findOne({ email: email });
    if (existingUser) {
      throw new HttpException('EMAIL_ALREADY_EXISTS', HttpStatus.CONFLICT);
    }

    const newUser = await this.userModel.create(userParse);

    if (role === UserRole.Buyer) {
      let walletAddress: string;
      let walletPrivateKey: string;

      try {
        const wallet = ethers.Wallet.createRandom();
        walletAddress = wallet.address;
        walletPrivateKey = wallet.privateKey;
      } catch (error) {
        // Generar una "pseudo wallet" en caso de error
        walletAddress = `pseudo_${Math.random().toString(36).substring(2, 15)}`;
        walletPrivateKey = `pseudo_${Math.random().toString(36).substring(2, 15)}`;
      }

      await this.sellerModel.create({
        user: newUser._id,
        email: email, // Asegurarse de que se establece el email
        walletAddress,
        walletPrivateKey, // Omitir guardar la privateKey si no es necesario
        // Otros campos específicos del seller desde userParse
      });
    }

    const payload = { id: newUser._id, roles: newUser.roles };
    const token = this.jwtService.sign(payload);

    return { user: newUser, token };
  }

  public async registerAdmin(userBody: RegisterAuthDto, role: UserRole) {
    const { password, email, ...user } = userBody;
    const userParse = { ...user, email, password: await generateHash(password), roles: [role] };

    const existingUser = await this.userModel.findOne({ email: email });
    if (existingUser) {
      throw new HttpException('EMAIL_ALREADY_EXISTS', HttpStatus.CONFLICT);
    }

    const newUser = await this.userModel.create(userParse);

    if (role === UserRole.Admin) {
      let walletAddress: string;
      let walletPrivateKey: string;

      try {
        const wallet = ethers.Wallet.createRandom();
        walletAddress = wallet.address;
        walletPrivateKey = wallet.privateKey;
      } catch (error) {
        // Generar una "pseudo wallet" en caso de error
        walletAddress = `pseudo_${Math.random().toString(36).substring(2, 15)}`;
        walletPrivateKey = `pseudo_${Math.random().toString(36).substring(2, 15)}`;
      }

      await this.sellerModel.create({
        user: newUser._id,
        email: email, // Asegurarse de que se establece el email
        walletAddress,
        walletPrivateKey, // Omitir guardar la privateKey si no es necesario
        // Otros campos específicos del seller desde userParse
      });
    }

    const payload = { id: newUser._id, roles: newUser.roles };
    const token = this.jwtService.sign(payload);

    return { user: newUser, token };
  }

  public async registerSuperAdmin(userBody: RegisterAuthDto, role: UserRole) {
    const { password, email, ...user } = userBody;
    const userParse = { ...user, email, password: await generateHash(password), roles: [role] };

    const existingUser = await this.userModel.findOne({ email: email });
    if (existingUser) {
      throw new HttpException('EMAIL_ALREADY_EXISTS', HttpStatus.CONFLICT);
    }

    const newUser = await this.userModel.create(userParse);

    if (role === UserRole.SuperAdmin) {
      let walletAddress: string;
      let walletPrivateKey: string;

      try {
        const wallet = ethers.Wallet.createRandom();
        walletAddress = wallet.address;
        walletPrivateKey = wallet.privateKey;
      } catch (error) {
        // Generar una "pseudo wallet" en caso de error
        walletAddress = `pseudo_${Math.random().toString(36).substring(2, 15)}`;
        walletPrivateKey = `pseudo_${Math.random().toString(36).substring(2, 15)}`;
      }

      await this.sellerModel.create({
        user: newUser._id,
        email: email, // Asegurarse de que se establece el email
        walletAddress,
        walletPrivateKey, // Omitir guardar la privateKey si no es necesario
        // Otros campos específicos del seller desde userParse
      });
    }

    const payload = { id: newUser._id, roles: newUser.roles };
    const token = this.jwtService.sign(payload);

    return { user: newUser, token };
  }

  public async registerSuperAdminCeo(userBody: RegisterAuthDto, role: UserRole) {
    const { password, email, ...user } = userBody;
    const userParse = { ...user, email, password: await generateHash(password), roles: [role] };

    const existingUser = await this.userModel.findOne({ email: email });
    if (existingUser) {
      throw new HttpException('EMAIL_ALREADY_EXISTS', HttpStatus.CONFLICT);
    }

    const newUser = await this.userModel.create(userParse);

    if (role === UserRole.SuperAdminCeo) {
      let walletAddress: string;
      let walletPrivateKey: string;

      try {
        const wallet = ethers.Wallet.createRandom();
        walletAddress = wallet.address;
        walletPrivateKey = wallet.privateKey;
      } catch (error) {
        // Generar una "pseudo wallet" en caso de error
        walletAddress = `pseudo_${Math.random().toString(36).substring(2, 15)}`;
        walletPrivateKey = `pseudo_${Math.random().toString(36).substring(2, 15)}`;
      }

      await this.sellerModel.create({
        user: newUser._id,
        email: email, // Asegurarse de que se establece el email
        walletAddress,
        walletPrivateKey, // Omitir guardar la privateKey si no es necesario
        // Otros campos específicos del seller desde userParse
      });
    }

    const payload = { id: newUser._id, roles: newUser.roles };
    const token = this.jwtService.sign(payload);

    return { user: newUser, token };
  }






      

        


}
