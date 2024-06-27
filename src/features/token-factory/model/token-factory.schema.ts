import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TokenFactoryDocument = TokenFactory & Document;

@Schema({ timestamps: true, collection: 'token_factories' })
export class TokenFactory {
  @Prop({ required: true })
  owner: string;

  @Prop()
  propertyTokenAddress: string;
}

export const TokenFactorySchema = SchemaFactory.createForClass(TokenFactory);
