import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccessControlDocument = AccessControl & Document;

@Schema({ timestamps: true, collection: 'access_controls' })
export class AccessControl {
  @Prop({ required: true, unique: true })
  address: string;

  @Prop({ type: Map, of: Boolean, default: {} })
  admins: Record<string, boolean>;
}

export const AccessControlSchema = SchemaFactory.createForClass(AccessControl);
