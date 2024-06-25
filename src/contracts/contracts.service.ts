import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { envs } from 'src/shared';
import { loadJSON } from 'src/shared/utils/json-loader.helper';

@Injectable()
export class ContractsService {
  private contract: ethers.Contract;
  private provider: ethers.providers.JsonRpcProvider;
  private wallet: ethers.Wallet;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(envs.ETH_RPC_URL);
    this.wallet = new ethers.Wallet(envs.PRIVATE_KEY, this.provider);
    const contractAddress = envs.CONTRACT_ADDRESS;
    const contractABI = loadJSON().abi;

    console.log('ETH_RPC_URL:', envs.ETH_RPC_URL);
    console.log('Contract Address:', contractAddress);
    console.log('Contract ABI:', contractABI);

    this.contract = new ethers.Contract(contractAddress, contractABI, this.wallet);

    if (this.contract && this.contract.functions) {
      console.log('Métodos disponibles en el contrato:', Object.keys(this.contract.functions));
    } else {
      console.error('El contrato no está correctamente inicializado.');
    }
  }

  async getSignerAddress(): Promise<string> {
    const address = this.wallet.address;
    console.log('address', address);
    return address;
  }
  async getBalance(): Promise<{ address: string; balance: string }> {
    const balance = await this.wallet.getBalance();
    console.log('address:', this.wallet.address);
    console.log('balance:', ethers.utils.formatEther(balance));
    return {
      address: this.wallet.address,
      balance: ethers.utils.formatEther(balance),
    };
  }


  async getPlatformCommissionPercentage(): Promise<number> {
    try {
      const result = await this.contract.platformCommissionPercentage();
      console.log('result', result);
      return result.toNumber();
    } catch (error) {
      console.error('Error obteniendo la comisión de la plataforma:', error);
      throw error;
    }
  }

  async getPromoterCommissionPercentage(): Promise<number> {
    try {
      const result = await this.contract.promoterCommissionPercentage();
      console.log('getPromoterCommissionPercentage', result);
      return result.toNumber();
    } catch (error) {
      console.error('Error obteniendo la comisión del promotor:', error);
      throw error;
    }
  }

  async setPlatformCommissionPercentage(percentage: number): Promise<any> {
    try {
      const transaction = await this.contract.setPlatformCommissionPercentage(percentage);
      await transaction.wait();
      return transaction;
    } catch (error) {
      console.error('Error estableciendo la comisión de la plataforma:', error);
      throw error;
    }
  }

  async setPromoterCommissionPercentage(percentage: number): Promise<any> {
    try {
      const transaction = await this.contract.setPromoterCommissionPercentage(percentage);
      await transaction.wait();
      return transaction;
    } catch (error) {
      console.error('Error estableciendo la comisión del promotor:', error);
      throw error;
    }
  }


  async createProperty(price: number): Promise<any> {
    try {
      const propertyId = ethers.utils.hexlify(ethers.utils.randomBytes(16)); // Generar un bytes16 válido
      const proof = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(propertyId)); // Generar un hash a partir del propertyId
      const transaction = await this.contract.createProperty(price, proof);
      await transaction.wait();
      console.log('createProperty', transaction);
      return transaction;
    } catch (error) {
      console.error('Error creando propiedad:', error);
      throw error;
    }
  }

  async comprarPropiedad(propiertieId: string, proof: string, promoter: string, value: ethers.BigNumber): Promise<any> {
    try {
      const transaction = await this.contract.comprarPropiedad(propiertieId, proof, promoter, { value });
      await transaction.wait();
      console.log('comprarPropiedad', transaction);
      return transaction;
    } catch (error) {
      console.error('Error comprando propiedad:', error);
      throw error;
    }
  }

  async transferirPropiedad(propertieHash: string, to: string): Promise<any> {
    try {
      const transaction = await this.contract.transferirPropiedad(propertieHash, to);
      await transaction.wait();
      console.log('transferirPropiedad', transaction);
      return transaction;
    } catch (error) {
      console.error('Error transfiriendo propiedad:', error);
      throw error;
    }
  }

  async getPropertieCount(): Promise<number> {
    try {
      const result = await this.contract.getPropertieCount();
      console.log('getPropertieCount', result);
      return result.toNumber();
    } catch (error) {
      console.error('Error obteniendo el conteo de propiedades:', error);
      throw error;
    }
  }

  async getPropertieHashAtIndex(index: number): Promise<string> {
    try {
      const result = await this.contract.getPropertieHashAtIndex(index);
      console.log('getPropertieHashAtIndex', result);
      return result;
    } catch (error) {
      console.error('Error obteniendo el hash de la propiedad en el índice:', error);
      throw error;
    }
  }

  async getPropertieByHash(propertieHash: string): Promise<any> {
    try {
      const result = await this.contract.getPropertieByHash(propertieHash);
      console.log('getPropertieByHash', result);
      return result;
    } catch (error) {
      console.error('Error obteniendo la propiedad por hash:', error);
      throw error;
    }
  }

  
}
