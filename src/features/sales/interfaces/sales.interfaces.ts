import { Schema } from 'mongoose';

export interface SaleDocument extends Document {
  id?: string;
  buyerId: Schema.Types.ObjectId;
  sellerId: Schema.Types.ObjectId;
  buyerEmail: string;
  buyerName: string;
  sellerEmail: string;
  sellerName: string;
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
}
