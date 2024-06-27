import { Schema, model, Document } from 'mongoose';

interface OrderDocument extends Document {
  userId: Schema.Types.ObjectId;
  userEmail: string;
  userName: string;
  propertyId: Schema.Types.ObjectId;
  propertyDetails: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    numberOfRooms: number;
    numberOfBathrooms: number;
    size: number;
    images: string[];
  };
  paymentMethod: string; // 'crypto' or 'credit_card'
  transactionDetails: {
    transactionHash?: string; // For crypto transactions
    paymentIntentId?: string; // For Stripe transactions
    amount: number;
    currency: string;
    status: string; // 'pending', 'completed', 'failed', 'expired'
  };
  createdAt: Date;
  updatedAt: Date;
  expirationTime: Date; // Tiempo límite para completar la transacción
}

const OrderSchema = new Schema<OrderDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userEmail: { type: String, required: true },
  userName: { type: String, required: true },
  propertyId: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
  propertyDetails: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
    numberOfRooms: { type: Number, required: true },
    numberOfBathrooms: { type: Number, required: true },
    size: { type: Number, required: true },
    images: [{ type: String, required: true }],
  },
  paymentMethod: { type: String, required: true },
  transactionDetails: {
    transactionHash: { type: String },
    paymentIntentId: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  expirationTime: { type: Date, required: false }, // Campo para el tiempo límite
}, { collection: 'orders' });

const OrderModel = model<OrderDocument>('Order', OrderSchema);

export { OrderModel, OrderDocument, OrderSchema };
