import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommissionManagerDocument = CommissionManager & Document;

@Schema({ timestamps: true, collection: 'commission_managers' })
export class CommissionManager {
  @Prop({ required: true })
  platformCommission: number;

  @Prop({ required: true })
  promoterCommission: number;

  @Prop({ required: true })
  platformAddress: string;

  @Prop({ required: true })
  promoterAddress: string;
}

export const CommissionManagerSchema = SchemaFactory.createForClass(CommissionManager);
