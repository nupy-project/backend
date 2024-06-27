import { Schema } from 'mongoose';

export interface OrderDetailDocument extends Document {
  id?: string;
  orderId: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}
