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
