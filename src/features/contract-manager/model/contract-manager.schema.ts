import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContractManagerDocument = ContractManager & Document;

@Schema({ timestamps: true, collection: 'contract_managers' })
export class ContractManager {
  @Prop({ required: true })
  propertyMarketplaceAddress: string;

  @Prop({ required: true })
  tokenFactoryAddress: string;

  @Prop({ required: true })
  transactionHandlerAddress: string;

  @Prop({ required: true })
  platformCommission: number;

  @Prop({ required: true })
  promoterCommission: number;

  @Prop({ required: true })
  platformAddress: string;

  @Prop({ required: true })
  promoterAddress: string;
}

export const ContractManagerSchema = SchemaFactory.createForClass(ContractManager);
