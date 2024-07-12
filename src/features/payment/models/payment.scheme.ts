import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true, collection: 'payments' })
export class Payment {
  @Prop({ unique: true, default: uuidv4 })
  id: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true, unique: true, default: uuidv4 })
  transactionId: string;

  
  @Prop({ required: true })
  transactionHash: string;

  @Prop({ required: false })
  paymentMethod?: string;

  @Prop({ required: false })
  description?: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
