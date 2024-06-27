import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { envs, loadJSON } from 'src/shared';
import { ICommissionManager } from '../contracts';

@Injectable()
export class CommissionManagerService {
  private contract: ICommissionManager;
  private provider: ethers.providers.JsonRpcProvider;
  private wallet: ethers.Wallet;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(envs.ETH_RPC_URL);
    this.wallet = new ethers.Wallet(envs.PRIVATE_KEY, this.provider);

    const contractAddress = envs.COMMISSION_MANAGER_ADDRESS;
    const contractABI = loadJSON().CommissionManager.abi;

    this.contract = new ethers.Contract(contractAddress, contractABI, this.wallet) as unknown as ICommissionManager;

    if (this.contract) {
      // console.log('Métodos disponibles en el contrato CommissionManager:', Object.keys(this.contract));
    } else {
      console.error('El contrato CommissionManager no está correctamente inicializado.');
    }
  }

  async admin(): Promise<string> {
    try {
      const result = await this.contract.admin();
      console.log('admin', result);
      return result;
    } catch (error) {
      console.error('Error obteniendo admin:', error);
      throw error;
    }
  }

  async platformAddress(): Promise<string> {
    try {
      const result = await this.contract.platformAddress();
      console.log('platformAddress', result);
      return result;
    } catch (error) {
      console.error('Error obteniendo platformAddress:', error);
      throw error;
    }
  }

  async platformCommission(): Promise<number> {
    try {
      const result = await this.contract.platformCommission();
      console.log('platformCommission', result);
      return result;
    } catch (error) {
      console.error('Error obteniendo platformCommission:', error);
      throw error;
    }
  }

  async promoterAddress(): Promise<string> {
    try {
      const result = await this.contract.promoterAddress();
      console.log('promoterAddress', result);
      return result;
    } catch (error) {
      console.error('Error obteniendo promoterAddress:', error);
      throw error;
    }
  }

  async promoterCommission(): Promise<number> {
    try {
      const result = await this.contract.promoterCommission();
      console.log('promoterCommission', result);
      return result;
    } catch (error) {
      console.error('Error obteniendo promoterCommission:', error);
      throw error;
    }
  }

  async setPlatformCommission(newCommission: number): Promise<void> {
    try {
      await this.contract.setPlatformCommission(newCommission);
      console.log('setPlatformCommission', newCommission);
    } catch (error) {
      console.error('Error en setPlatformCommission:', error);
      throw error;
    }
  }

  async setPromoterCommission(newCommission: number): Promise<void> {
    try {
      await this.contract.setPromoterCommission(newCommission);
      console.log('setPromoterCommission', newCommission);
    } catch (error) {
      console.error('Error en setPromoterCommission:', error);
      throw error;
    }
  }

  async setPlatformAddress(newAddress: string): Promise<void> {
    try {
      await this.contract.setPlatformAddress(newAddress);
      console.log('setPlatformAddress', newAddress);
    } catch (error) {
      console.error('Error en setPlatformAddress:', error);
      throw error;
    }
  }

  async setPromoterAddress(newAddress: string): Promise<void> {
    try {
      await this.contract.setPromoterAddress(newAddress);
      console.log('setPromoterAddress', newAddress);
    } catch (error) {
      console.error('Error en setPromoterAddress:', error);
      throw error;
    }
  }

  async getPlatformCommission(): Promise<number> {
    try {
      const result = await this.contract.getPlatformCommission();
      console.log('getPlatformCommission', result);
      return result;
    } catch (error) {
      console.error('Error en getPlatformCommission:', error);
      throw error;
    }
  }

  async getPromoterCommission(): Promise<number> {
    try {
      const result = await this.contract.getPromoterCommission();
      console.log('getPromoterCommission', result);
      return result;
    } catch (error) {
      console.error('Error en getPromoterCommission:', error);
      throw error;
    }
  }
}
