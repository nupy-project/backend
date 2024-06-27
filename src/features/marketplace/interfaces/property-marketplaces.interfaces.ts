import { BigNumber, EventFilter } from "ethers";

export interface IPropertyMarketplace {
    // Events
    PropertieCountUpdated(totalOwnedPropiedad: BigNumber): EventFilter;
    PropertieCreated(
      propertyHash: string,
      id: BigNumber,
      price: BigNumber,
      proof: string,
      owner: string,
      state: number
    ): EventFilter;
    PropertiePurchased(
      propertyHash: string,
      id: BigNumber,
      price: BigNumber,
      owner: string,
      state: number
    ): EventFilter;
    PropertieTransferred(
      propertyHash: string,
      from: string,
      to: string
    ): EventFilter;
  
    // Functions
    createProperty(price: BigNumber, proof: string): Promise<string>;
  
    comprarPropiedad(
      propertyHash: string,
      promoter: string,
      options?: { value?: BigNumber }
    ): Promise<void>;
  
    transferirPropiedad(
      propertyHash: string,
      to: string
    ): Promise<void>;
  
    getPropertieCount(): Promise<BigNumber>;
  
    getPropertieHashAtIndex(index: BigNumber): Promise<string>;
  
    getPropertieByHash(propertyHash: string): Promise<{
      id: BigNumber;
      price: BigNumber;
      proof: string;
      owner: string;
      state: number;
    }>;
  }
  