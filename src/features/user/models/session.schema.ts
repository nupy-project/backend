import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type SessionDocument = SessionModel & Document;

@Schema({ timestamps: true, collection: 'sessions' })
export class SessionModel {
  @Prop({ unique: true, default: uuidv4 })
  id: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  ipAddress: string;

  @Prop({ required: true })
  browserName: string;

  @Prop({ required: true })
  deviceType: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const SessionSchema = SchemaFactory.createForClass(SessionModel);
