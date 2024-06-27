import { Schema } from 'mongoose';

export interface OrderDocument extends Document {
  id?: string;
  userId: Schema.Types.ObjectId;
  buyerId: Schema.Types.ObjectId;
  sellerId: Schema.Types.ObjectId;
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
