/* eslint-disable @typescript-eslint/ban-types */
// models/property.model.ts

import { Schema, model, Document } from 'mongoose';

interface PropertyDocument extends Document {
  type: number;
  chainId: number;
  nonce: number;
  maxPriorityFeePerGas: string;
  maxFeePerGas: string;
  gasPrice: string | null;
  gasLimit: string;
  to: string;
  value: string;
  data: string;
  accessList: AccessListItemDocument[];
  hash: string;
  v: number;
  r: string;
  s: string;
  from: string;
  confirmations: number;
  wait: Function;
  totalProperties: number;
  propertyHash: string;
  propertyDetails: PropertyDetailsDocument[];
}

interface PropertyDetailsDocument extends Document {
  id: string;
  price: string;
  proof: string;
  owner: string;
  state: number;
}

interface AccessListItemDocument extends Document {
  address: string;
  storageKeys: string[];
}

const AccessListItemSchema = new Schema<AccessListItemDocument>({
  address: { type: String, required: true },
  storageKeys: { type: [String], required: true }
});

const PropertyDetailsSchema = new Schema<PropertyDetailsDocument>({
  id: { type: String, required: true },
  price: { type: String, required: true },
  proof: { type: String, required: true },
  owner: { type: String, required: true },
  state: { type: Number, required: true }
});

const PropertySchema = new Schema<PropertyDocument>({
  type: { type: Number, required: true },
  chainId: { type: Number, required: true },
  nonce: { type: Number, required: true },
  maxPriorityFeePerGas: { type: String, required: true },
  maxFeePerGas: { type: String, required: true },
  gasPrice: { type: String, required: false },
  gasLimit: { type: String, required: true },
  to: { type: String, required: true },
  value: { type: String, required: true },
  data: { type: String, required: true },
  accessList: { type: [AccessListItemSchema], required: true },
  hash: { type: String, required: true },
  v: { type: Number, required: true },
  r: { type: String, required: true },
  s: { type: String, required: true },
  from: { type: String, required: true },
  confirmations: { type: Number, required: true },
  wait: { type: Function, required: true },
  totalProperties: { type: Number, required: true },
  propertyHash: { type: String, required: true },
  propertyDetails: { type: [PropertyDetailsSchema], required: true }
});

const PropertyModel = model<PropertyDocument>('Property', PropertySchema);

export { PropertyModel, PropertyDocument, PropertyDetailsDocument, AccessListItemDocument };
