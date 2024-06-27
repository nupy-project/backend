import { Injectable } from '@nestjs/common';
import { ethers, BigNumber } from 'ethers';
import { IPropertyMarketplace } from 'src/contracts';
import { envs, loadJSON } from 'src/shared';

@Injectable()
export class PropertyMarketplaceService {
  private contract: IPropertyMarketplace;
  private provider: ethers.providers.JsonRpcProvider;
  private wallet: ethers.Wallet;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(envs.ETH_RPC_URL);
    this.wallet = new ethers.Wallet(envs.PRIVATE_KEY, this.provider);

    const contractAddress = envs.PROPERTY_MARKETPLACE_ADDRESS;
    const contractABI = loadJSON().PropertyMarketplace.abi;

    this.contract = new ethers.Contract(contractAddress, contractABI, this.wallet) as unknown as IPropertyMarketplace;

    if (this.contract) {
      console.log('Métodos disponibles en el contrato PropertyMarketplace:', Object.keys(this.contract));
    } else {
      console.error('El contrato PropertyMarketplace no está correctamente inicializado.');
    }
  }

  async createProperty(price: BigNumber, proof: string): Promise<string> {
    try {
      const result = await this.contract.createProperty(price, proof);
      console.log('createProperty', result);
      return result;
    } catch (error) {
      console.error('Error creando propiedad:', error);
      throw error;
    }
  }

  async comprarPropiedad(propertyHash: string, promoter: string, value: BigNumber): Promise<void> {
    try {
      const result = await this.contract.comprarPropiedad(propertyHash, promoter, { value });
      console.log('comprarPropiedad', result);
    } catch (error) {
      console.error('Error comprando propiedad:', error);
      throw error;
    }
  }

  async transferirPropiedad(propertyHash: string, to: string): Promise<void> {
    try {
      const result = await this.contract.transferirPropiedad(propertyHash, to);
      console.log('transferirPropiedad', result);
    } catch (error) {
      console.error('Error transfiriendo propiedad:', error);
      throw error;
    }
  }

  async getPropertieCount(): Promise<BigNumber> {
    try {
      const result = await this.contract.getPropertieCount();
      console.log('getPropertieCount', result);
      return result;
    } catch (error) {
      console.error('Error obteniendo el conteo de propiedades:', error);
      throw error;
    }
  }

  async getPropertieHashAtIndex(index: BigNumber): Promise<string> {
    try {
      const result = await this.contract.getPropertieHashAtIndex(index);
      console.log('getPropertieHashAtIndex', result);
      return result;
    } catch (error) {
      console.error('Error obteniendo el hash de la propiedad en el índice:', error);
      throw error;
    }
  }

  async getPropertieByHash(propertyHash: string): Promise<{
    id: BigNumber;
    price: BigNumber;
    proof: string;
    owner: string;
    state: number;
  }> {
    try {
      const result = await this.contract.getPropertieByHash(propertyHash);
      console.log('getPropertieByHash', result);
      return result;
    } catch (error) {
      console.error('Error obteniendo la propiedad por hash:', error);
      throw error;
    }
  }
}
