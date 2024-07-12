import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ required: true })
  payer: string; // Dirección del pagador

  @Prop({ required: true })
  amount: number; // Monto de la transacción

  @Prop({ required: true })
  timestamp: number; // Timestamp de la transacción

  @Prop({ required: true })
  event: string; // 'PaymentReceived' o 'PaymentRefunded'

  @Prop({ required: true })
  transactionHash: string; // Hash de la transacción en la blockchain
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
