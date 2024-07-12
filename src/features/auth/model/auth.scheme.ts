import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthDocument = AuthModel & Document;

@Schema({ timestamps: true, collection: 'auth' })
export class AuthModel {

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true })
  mobile: string;

  @Prop({ default: 'https://placehold.co/330x220?text=Profile+Image' })
  profilePicture: string;

  @Prop({ default: false })
  isEmailVerified: boolean;
  
  @Prop({ default: false })
  status: boolean;

  @Prop({ required: true })
  terminos: boolean;
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel);
