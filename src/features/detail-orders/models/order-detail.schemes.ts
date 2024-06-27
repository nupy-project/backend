import { Schema, model } from 'mongoose';
import { OrderDetailDocument } from '../interfaces/order-detail.interfaces';

const OrderDetailSchema = new Schema<OrderDetailDocument>({
  orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { collection: 'orderDetails' });

const OrderDetailModel = model<OrderDetailDocument>('OrderDetail', OrderDetailSchema);

export { OrderDetailModel, OrderDetailDocument, OrderDetailSchema };
