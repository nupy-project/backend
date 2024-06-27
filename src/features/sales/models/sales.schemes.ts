import { Schema, model } from 'mongoose';
import { SaleDocument } from '../interfaces/sales.interfaces';

const SaleSchema = new Schema<SaleDocument>({
  buyerId: { type: Schema.Types.ObjectId, ref: 'Buyer', required: true },
  sellerId: { type: Schema.Types.ObjectId, ref: 'Seller', required: true },
  buyerEmail: { type: String, required: true },
  buyerName: { type: String, required: true },
  sellerEmail: { type: String, required: true },
  sellerName: { type: String, required: true },
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
    images: [{ type: String, required: false }],
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
}, { collection: 'sales' });

const SaleModel = model<SaleDocument>('Sale', SaleSchema);

export { SaleModel, SaleDocument, SaleSchema };
