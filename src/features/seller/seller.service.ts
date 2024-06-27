import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ethers } from 'ethers';
import { envs, loadJSON } from 'src/shared';
import { Seller, SellerDocument } from './model/seller.scheme';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { Types } from 'mongoose';
import { UserDocument, UserModel } from '../user/models/user.schema';
import { ContractsService } from '../contracts/contracts.service';
import { CreatePropertyDto } from '../token-factory/dto/create-property.dto';
import { PropertyDocument, PropertyModel } from '../token-factory/model/properties-tokenFactory.schemes';

@Injectable()
export class SellerService {
  private contract: any;
  private provider: ethers.providers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private static readonly TRANSACTION_COST = 10; // Costo aproximado de la transacción en USD

  constructor(
    @InjectModel(PropertyModel.name) private propertyModel: Model<PropertyDocument>,
    @InjectModel(Seller.name) private readonly sellerModel: Model<SellerDocument>,
    @InjectModel(UserModel.name) private readonly userModel: Model<UserDocument>,
    private readonly contractsService: ContractsService,
  ) {
    this.provider = new ethers.providers.JsonRpcProvider(envs.ETH_RPC_URL);
    this.wallet = new ethers.Wallet(envs.PRIVATE_KEY, this.provider);

    const contractAddress = envs.TOKEN_FACTORY_ADDRESS;
    const contractABI = loadJSON().TokenFactory.abi;

    this.contract = new ethers.Contract(
      contractAddress,
      contractABI,
      this.wallet,
    ) as unknown as any;

    if (this.contract) {
      // console.log('Métodos disponibles en el contrato TOKEN_FACTORY_ADDRESS:', Object.keys(this.contract));
    } else {
      console.error(
        'El contrato TOKEN_FACTORY_ADDRESS no está correctamente inicializado.',
      );
    }
  }

  async getBalance(): Promise<{ address: string; balance: string }> {
    const balance = await this.wallet.getBalance();
    console.log('address:', this.wallet.address);
    console.log('balance:', ethers.utils.formatEther(balance));
    return {
      address: this.wallet.address,
      balance: ethers.utils.formatEther(balance),
    };
  }

  async updateSeller(userId: string, updateSellerDto: UpdateSellerDto): Promise<Seller> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new NotFoundException(`Invalid user ID: ${userId}`);
    }

    const seller = await this.sellerModel.findOne({ user: userId });
    if (!seller) {
      throw new NotFoundException(`Seller with user ID ${userId} not found`);
    }
    Object.assign(seller, updateSellerDto);
    await seller.save();

    return seller;
  }

  async create(createPropertyDto: CreatePropertyDto, user: any) {
    const { price, description, street, city, state, country, postalCode, numberOfRooms, numberOfBathrooms, size, images, ownerName, contactInfo } = createPropertyDto;

    // Interactuar con el contrato para crear una propiedad
    const transaction = await this.contractsService.createProperty(price);
    const receipt = await transaction.wait();

    const propertyDetails = {
      id: transaction.hash,
      price: price.toString(),
      proof: transaction.proof, // Asegúrate de que proof esté disponible en la transacción
      owner: await this.contractsService.getSignerAddress(),
      state: 0 // Estado inicial, ajustarlo según tu lógica
    };

    // Crear la nueva propiedad con los detalles de la transacción y los campos adicionales
    const createdProperty = new this.propertyModel({
      type: transaction.type,
      chainId: transaction.chainId,
      nonce: transaction.nonce,
      maxPriorityFeePerGas: transaction.maxPriorityFeePerGas ? transaction.maxPriorityFeePerGas.hex : null,
      maxFeePerGas: transaction.maxFeePerGas ? transaction.maxFeePerGas.hex : null,
      gasPrice: transaction.gasPrice ? transaction.gasPrice.hex : null,
      gasLimit: transaction.gasLimit ? transaction.gasLimit.hex : null,
      to: transaction.to,
      value: transaction.value ? transaction.value.hex : null,
      data: transaction.data,
      accessList: transaction.accessList ? transaction.accessList.map((item: any) => ({
        address: item.address,
        storageKeys: item.storageKeys,
      })) : [],
      hash: transaction.hash,
      v: transaction.v,
      r: transaction.r,
      s: transaction.s,
      from: transaction.from,
      confirmations: receipt.confirmations, // Usar el número de confirmaciones del receipt
      totalProperties: 1, // Inicialmente 1, ajustar según tu lógica
      propertyHash: ethers.utils.keccak256(ethers.utils.toUtf8Bytes(ethers.utils.hexlify(ethers.utils.randomBytes(16)))), // Ajusta esto según sea necesario
      propertyDetails: [propertyDetails],
      createdBy: {
        userId: user._id,
        email: user.email,
        name: user.name
      }, // Guardar más detalles del usuario que creó la propiedad
      description, // Campos adicionales
      street,
      city,
      state,
      country,
      postalCode,
      numberOfRooms,
      numberOfBathrooms,
      size,
      images,
      ownerName,
      contactInfo,
      status: 'creada', // Estado inicial Purchased
      isPublished: false // No publicada inicialmente
    });

    try {
      await createdProperty.save();
      return createdProperty;
    } catch (error) {
      console.log('error=>>>>>', error);
      throw new BadRequestException('Error guardando la propiedad en la base de datos');
    }
  }


  async publishProperty(id: string, userId: string): Promise<PropertyDocument> {
    const property = await this.propertyModel.findById(id);
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    const seller = await this.sellerModel.findOne({ user: userId });
    if (!seller) {
      throw new NotFoundException(`Seller with user ID ${userId} not found`);
    }

    // Verificar si el vendedor ya ha utilizado su publicación gratuita
    if (seller.freePublicationsUsed < 1) {
      seller.freePublicationsUsed += 1;
    } else {
      // Verificar el saldo de la wallet
      const balance = await this.wallet.getBalance();
      const balanceInEth = parseFloat(ethers.utils.formatEther(balance));
      const transactionCostInEth = SellerService.TRANSACTION_COST / envs.ETH_USD_EXCHANGE_RATE;

      if (balanceInEth < transactionCostInEth) {
        throw new BadRequestException('Insufficient balance to publish the property');
      }

      // Deduce la comisión
      await this.wallet.sendTransaction({
        to: envs.ADMIN_WALLET_ADDRESS, // Usamos la dirección del admin desde las variables de entorno
        value: ethers.utils.parseEther(transactionCostInEth.toString()),
      });
    }

    // Cambiar el estado a Activated y marcarla como publicada
    property.status = 'publicada';
    property.isPublished = true;

    try {
      await property.save();
      await seller.save();
      return property;
    } catch (error) {
      console.log('error=>>>>>', error);
      throw new BadRequestException('Error publishing the property');
    }
  }

  // recuerda hacer paginacion
  async findAll() {
    return this.propertyModel.find().exec();
  }

  async findOne(id: string): Promise<PropertyDocument> {
    const property = await this.propertyModel.findById(id).exec();
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    return property;
  }

  async updateProperty(id: string, updatePropertyDto: any): Promise<PropertyDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid property ID: ${id}`);
    }

    const property = await this.propertyModel.findById(id);
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    // Actualizamos solo los campos de la base de datos
    const { status, ...updateFields } = updatePropertyDto;
    Object.assign(property, updateFields);

    // Validamos y actualizamos el estado
    if (status) {
      const validStatuses = ['Purchased', 'Activated', 'Deactivated'];
      if (!validStatuses.includes(status)) {
        throw new BadRequestException(`Invalid status: ${status}`);
      }
      property.status = status;
    }

    try {
      await property.save();
      return property;
    } catch (error) {
      console.log('error=>>>>>', error);
      throw new BadRequestException('Error actualizando la propiedad en la base de datos');
    }
  }
}
