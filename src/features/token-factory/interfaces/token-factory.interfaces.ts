import { EventFilter } from "ethers";

export interface ITokenFactory {
  // Events
  OwnershipTransferred(previousOwner?: string | null, newOwner?: string | null): EventFilter;
  PropertyTokenCreated(tokenAddress?: string | null): EventFilter;

  // Functions
  owner(): Promise<string>;

  propertyTokenAddress(): Promise<string>;

  renounceOwnership(): Promise<void>;

  transferOwnership(newOwner: string): Promise<void>;

  createPropertyToken(): Promise<void>;
}



import { Schema, Document } from 'mongoose';

export interface PropertyDocument extends Document {
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
  status: string; // New field
  isPublished: boolean; // New field
  // createdBy: {
  //   userId: Schema.Types.ObjectId;
  //   email: string;
  //   name: string;
  // };
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

// interface PropertyDetailsDocument extends Document {
//   id?: string;
//   price?: string;
//   proof?: string;
//   owner?: string;
//   state?: number;
// }

// interface AccessListItemDocument extends Document {
//   address: string;
//   storageKeys: string[];
// }

export const AccessListItemSchema = new Schema<AccessListItemDocument>({
  address: { type: String, required: true },
  storageKeys: { type: [String], required: false }
});

export const PropertyDetailsSchema = new Schema<PropertyDetailsDocument>({
  id: { type: String, required: false },
  price: { type: String, required: false },
  proof: { type: String, required: false },
  owner: { type: String, required: false },
  state: { type: Number, required: false }
});




export interface AccessListItemDocument {
  address?: string;
  storageKeys?: string[];
}

export interface PropertyDetailsDocument {
  id?: string;
  price?: string;
  proof?: string;
  owner?: string;
  state?: number;
}

export interface PropertyDocument {
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
  // v?: number;
  // r?: string;
  // s?: string;
  from?: string;
  confirmations?: number;
  totalProperties?: number;
  propertyHash?: string;
  propertyDetails?: PropertyDetailsDocument[];
  createdBy: {
    userId: string;
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
  status: string; // New field
  isPublished: boolean; // New field
  }
