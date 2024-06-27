import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type SellerDocument = Seller & Document;

@Schema({ timestamps: true, collection: 'sellers' })
export class Seller {
  @Prop({ unique: true, default: uuidv4 })
  id: string;

  @Prop({ type: String, unique: true })
  walletAddress: string;

  @Prop({ type: String, unique: true, required: true }) // Asegurarse de que el email sea requerido y único
  email: string;

  @Prop({ required: false })
  name: string;

  @Prop()
  password: string;

  @Prop()
  companyName: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  address: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  country: string;

  @Prop()
  postalCode: string;

  @Prop()
  avatar: string;

  @Prop()
  description: string;

  @Prop()
  rating: number;

  @Prop()
  totalSales: number;

  @Prop({ default: ['seller'] })
  roles: string[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Property' }] })
  propertiesListed: MongooseSchema.Types.ObjectId[]; // Referencia a las propiedades listadas por el vendedor

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Sale' }] })
  salesHistory: MongooseSchema.Types.ObjectId[];

  @Prop({ type: Number, default: 0 })
  totalPropertiesListed: number;

  @Prop({ type: Number, default: 0 })
  totalPropertiesSold: number;

  @Prop()
  identificationNumber: string; // Número de identificación del vendedor

  @Prop()
  identificationType: string; // Tipo de identificación (e.g., DNI, Pasaporte)

  @Prop()
  identificationDocument: string; // URL del documento de identificación subido
  
  @Prop()
  walletPrivateKey:string

  @Prop()
  verificationStatus: string; // Estado de verificación (e.g., 'pending', 'verified', 'rejected')

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId; // Referencia al usuario, usando Types.ObjectId
  
  @Prop({ type: Number, default: 0 })
  freePublicationsUsed: number;
}

export const SellerSchema = SchemaFactory.createForClass(Seller);
