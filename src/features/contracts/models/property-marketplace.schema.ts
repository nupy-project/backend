import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PropertyMarketplaceDocument = PropertyMarketplace & Document;

@Schema({ timestamps: true, collection: 'property_marketplaces' })
export class PropertyMarketplace {
  @Prop({ required: true })
  commissionManager: string;

  @Prop({ type: Array, default: [] })
  properties: {
    id: string;
    price: number;
    proof: string;
    owner: string;
    state: string;
  }[];
}

export const PropertyMarketplaceSchema = SchemaFactory.createForClass(PropertyMarketplace);
