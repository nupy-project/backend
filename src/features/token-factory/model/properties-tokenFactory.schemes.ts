import { Schema, model } from 'mongoose';
import { AccessListItemDocument, AccessListItemSchema, PropertyDetailsDocument, PropertyDetailsSchema, PropertyDocument } from '../interfaces/token-factory.interfaces';

const PropertySchema = new Schema<PropertyDocument>({
  type: { type: Number, required: false },
  chainId: { type: Number, required: false },
  nonce: { type: Number, required: false },
  maxPriorityFeePerGas: { type: String, required: false },
  maxFeePerGas: { type: String, required: false },
  gasPrice: { type: String, required: false },
  gasLimit: { type: String, required: false },
  to: { type: String, required: false },
  value: { type: String, required: false },
  data: { type: String, required: false },
  accessList: { type: [AccessListItemSchema], required: false },
  hash: { type: String, required: false },
  from: { type: String, required: false },
  confirmations: { type: Number, required: false },
  totalProperties: { type: Number, required: false },
  propertyHash: { type: String, required: false },
  propertyDetails: { type: [PropertyDetailsSchema], required: false },
  createdBy: {
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: false },
    email: { type: String, required: false },
    name: { type: String, required: false }
  },
  description: { type: String, required: false },
  street: { type: String, required: false },
  city: { type: String, required: false },
  state: { type: String, required: false },
  country: { type: String, required: false },
  postalCode: { type: String, required: false },
  numberOfRooms: { type: Number, required: false },
  numberOfBathrooms: { type: Number, required: false },
  size: { type: Number, required: false },
  images: { type: [String], required: false },
  status: { type: String, required: true, default: 'Purchased' }, // New field
  isPublished: { type: Boolean, required: true, default: false }, // New field
}, { collection: 'properties' });

const PropertyModel = model<PropertyDocument>('Propertie', PropertySchema);

export { PropertyModel, PropertySchema, PropertyDocument, PropertyDetailsDocument, AccessListItemDocument };
