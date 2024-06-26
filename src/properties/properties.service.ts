import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { ContractsService } from '../contracts/contracts.service';
import { PropertyDocument, PropertyModel } from './models/property.model';
import { ethers } from 'ethers';
import { UserDocument, UserModel } from 'src/user/models/user.schema';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(PropertyModel.name) private propertyModel: Model<PropertyDocument>,
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
    private contractsService: ContractsService,
  ) {}

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
      contactInfo
    });

    try {
      await createdProperty.save();
      return createdProperty;
    } catch (error) {
      throw new BadRequestException('Error guardando la propiedad en la base de datos');
    }
  }

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

  async update(id: string, updatePropertyDto: UpdatePropertyDto) {
    return this.propertyModel.findByIdAndUpdate(id, updatePropertyDto, { new: true }).exec();
  }
}
