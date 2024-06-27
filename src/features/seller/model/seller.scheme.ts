import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type SellerDocument = Seller & Document;

@Schema({ timestamps: true, collection: 'sellers' })
export class Seller {
  @Prop({ unique: true, default: uuidv4 })
  id: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
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

  @Prop({
    default: ['seller'],
  })
  roles: string[];

  @Prop({ type: [{ type: String }] })
  propertiesListed: string[]; // Array de IDs de propiedades listadas por el vendedor

  @Prop({ required: true })
  walletAddress: string; // Dirección de la wallet del vendedor

  @Prop()
  identificationNumber: string; // Número de identificación del vendedor

  @Prop()
  identificationType: string; // Tipo de identificación (e.g., DNI, Pasaporte)

  @Prop()
  identificationDocument: string; // URL del documento de identificación subido

  @Prop()
  verificationStatus: string; // Estado de verificación (e.g., 'pending', 'verified', 'rejected')
}

export const SellerSchema = SchemaFactory.createForClass(Seller);
