import { Schema, model, Document } from 'mongoose';

interface PropertyDocument extends Document {
  type?: number;
  chainId?: number;
  nonce?: number;
  maxPriorityFeePerGas?: string;
  maxFeePerGas?: string;
  gasPrice?: string | null;
  gasLimit?: string;
  to?: string;
  value?: string;
  data?: string;
  accessList?: AccessListItemDocument[];
  hash?: string;
  v?: number;
  r?: string;
  s?: string;
  from?: string;
  confirmations?: number;
  totalProperties?: number;
  propertyHash?: string;
  propertyDetails?: PropertyDetailsDocument[];
  createdBy: {
    userId: Schema.Types.ObjectId;
    email: string;
    name: string;
  };
  description?: string;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  numberOfRooms?: number;
  numberOfBathrooms?: number;
  size?: number;
  images?: string[];
}

interface PropertyDetailsDocument extends Document {
  id?: string;
  price?: string;
  proof?: string;
  owner?: string;
  state?: number;
}

interface AccessListItemDocument extends Document {
  address: string;
  storageKeys: string[];
}

const AccessListItemSchema = new Schema<AccessListItemDocument>({
  address: { type: String, required: true },
  storageKeys: { type: [String], required: false }
});

const PropertyDetailsSchema = new Schema<PropertyDetailsDocument>({
  id: { type: String, required: false },
  price: { type: String, required: false },
  proof: { type: String, required: false },
  owner: { type: String, required: false },
  state: { type: Number, required: false }
});

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
  v: { type: Number, required: false },
  r: { type: String, required: false },
  s: { type: String, required: false },
  from: { type: String, required: false },
  confirmations: { type: Number, required: false },
  totalProperties: { type: Number, required: false },
  propertyHash: { type: String, required: false },
  propertyDetails: { type: [PropertyDetailsSchema], required: false },
  createdBy: {
    userId: { type: Schema.Types.ObjectId, ref: 'UserModel', required: true },
    email: { type: String, required: true },
    name: { type: String, required: true }
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
  images: { type: [String], required: false }
}, { collection: 'properties' });

const PropertyModel = model<PropertyDocument>('Property', PropertySchema);

export { PropertyModel, PropertySchema, PropertyDocument, PropertyDetailsDocument, AccessListItemDocument };
