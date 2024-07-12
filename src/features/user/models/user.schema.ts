import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '../interfaces/roles.interface';

export type UserDocument = UserModel & Document;

@Schema({ timestamps: true, collection: 'users' })
export class UserModel {

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password?: string;

  @Prop({
    type: [String],
    enum: UserRole,
    default: [UserRole.USER],
  })
  roles?: UserRole[];

  @Prop()
  username?: string;

  @Prop()
  walletAddress?: string;

  @Prop()
  walletPrivateKey?: string;

  @Prop()
  country?: string;

  @Prop({ default: 'https://placehold.co/330x220?text=Profile+Image' })
  profilePicture?: string;

  @Prop()
  browserName?: string;

  @Prop()
  deviceType?: string;

  @Prop()
  emailVerificationToken?: string;

  @Prop({ default: false })
  isEmailVerified?: boolean;

  @Prop()
  refreshToken?: string;

  @Prop()
  fullname?: string;

  @Prop()
  lastname?: string; // Añadido campo lastname

  @Prop()
  company?: string;

  @Prop()
  contactPhone?: string;

  @Prop()
  companySite?: string;

  @Prop({
    type: [String],
    enum: ['Email', 'Phone'],
  })
  communication?: string[];

  @Prop()
  allowChanges?: boolean;

  @Prop()
  language?: string;

  @Prop()
  timeZone?: string;

  @Prop()
  currency?: string;

  @Prop({ default: false })
  allowMarketing?: boolean;

  @Prop({ required: true })
  mobile: string;

  @Prop({ required: true })
  countryCode: string; // Añadido campo countryCode

  @Prop({ required: true })
  terminos: boolean;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
