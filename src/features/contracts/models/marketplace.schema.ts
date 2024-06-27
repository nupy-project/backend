import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MarketplaceDocument = Marketplace & Document;

@Schema({ timestamps: true, collection: 'marketplaces' })
export class Marketplace {
  @Prop({ required: true })
  admin: string;

  @Prop({ type: Array, default: [] })
  listings: {
    tokenId: string;
    tokenAddress: string;
    price: number;
    seller: string;
  }[];
}

export const MarketplaceSchema = SchemaFactory.createForClass(Marketplace);
