import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PropertyTokenDocument = PropertyToken & Document;

@Schema({ timestamps: true, collection: 'property_tokens' })
export class PropertyToken {
  @Prop({ required: true, unique: true })
  tokenId: string;

  @Prop({ required: true })
  owner: string;

  @Prop()
  metadata: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  symbol: string;
}

export const PropertyTokenSchema = SchemaFactory.createForClass(PropertyToken);
