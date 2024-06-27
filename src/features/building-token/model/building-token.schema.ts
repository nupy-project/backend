import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BuildingTokenDocument = BuildingToken & Document;

@Schema({ timestamps: true, collection: 'building_tokens' })
export class BuildingToken {
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

export const BuildingTokenSchema = SchemaFactory.createForClass(BuildingToken);
