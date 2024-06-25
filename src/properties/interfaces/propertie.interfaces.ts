/* eslint-disable @typescript-eslint/ban-types */
import { Model, Types } from "mongoose";

export interface ModelExt<T> extends Model<T> {
    delete: (data: { _id: Types.ObjectId }) => void;
    paginate: (query: any, pagination: any) => void;
  }


// interfaces/property.interface.ts

export interface Property {
  type: number;
  chainId: number;
  nonce: number;
  maxPriorityFeePerGas: string; // BigNumber as string
  maxFeePerGas: string; // BigNumber as string
  gasPrice: string | null; // BigNumber as string or null
  gasLimit: string; // BigNumber as string
  to: string;
  value: string; // BigNumber as string
  data: string;
  accessList: AccessListItem[]; // Tipo de acceso ajustado
  hash: string;
  v: number;
  r: string;
  s: string;
  from: string;
  confirmations: number;
  wait: Function;
  totalProperties: number;
  propertyHash: string;
  propertyDetails: PropertyDetails[];
}

export interface PropertyDetails {
  id: string; // BigNumber as string
  price: string; // BigNumber as string
  proof: string;
  owner: string;
  state: number;
}

export interface AccessListItem {
  address: string;
  storageKeys: string[];
}
