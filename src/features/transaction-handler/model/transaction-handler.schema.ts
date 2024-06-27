import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionHandlerDocument = TransactionHandler & Document;

@Schema({ timestamps: true, collection: 'transaction_handlers' })
export class TransactionHandler {
  @Prop({ required: true })
  commissionManager: string;

  @Prop({ type: Array, default: [] })
  transactions: {
    amount: number;
    from: string;
    to: string;
    timestamp: Date;
  }[];
}

export const TransactionHandlerSchema = SchemaFactory.createForClass(TransactionHandler);
