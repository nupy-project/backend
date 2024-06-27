import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { IContractManager } from 'src/contracts';
import { envs, loadJSON } from 'src/shared';

@Injectable()
export class ContractManagerService {
  private contract: IContractManager;
  private provider: ethers.providers.JsonRpcProvider;
  private wallet: ethers.Wallet;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(envs.ETH_RPC_URL);
    this.wallet = new ethers.Wallet(envs.PRIVATE_KEY, this.provider);

    const contractAddress = envs.CONTRACT_MANAGER_ADDRESS;
    const contractABI = loadJSON().ContractManager.abi;

    this.contract = new ethers.Contract(contractAddress, contractABI, this.wallet) as unknown as IContractManager;

    if (this.contract) {
      console.log('Métodos disponibles en el contrato ContractManager:', Object.keys(this.contract));
    } else {
      console.error('El contrato ContractManager no está correctamente inicializado.');
    }
  }

  async accessControl(): Promise<string> {
    try {
      const result = await this.contract.accessControl();
      console.log('accessControl', result);
      return result;
    } catch (error) {
      console.error('Error obteniendo accessControl:', error);
      throw error;
    }
  }

  async commissionManager(): Promise<string> {
    try {
      const result = await this.contract.commissionManager();
      console.log('commissionManager', result);
      return result;
    } catch (error) {
      console.error('Error obteniendo commissionManager:', error);
      throw error;
    }
  }

  async marketplace(): Promise<string> {
    try {
      const result = await this.contract.marketplace();
      console.log('marketplace', result);
      return result;
    } catch (error) {
      console.error('Error obteniendo marketplace:', error);
      throw error;
    }
  }

  async tokenFactory(): Promise<string> {
    try {
      const result = await this.contract.tokenFactory();
      console.log('tokenFactory', result);
      return result;
    } catch (error) {
      console.error('Error obteniendo tokenFactory:', error);
      throw error;
    }
  }

  async transactionHandler(): Promise<string> {
    try {
      const result = await this.contract.transactionHandler();
      console.log('transactionHandler', result);
      return result;
    } catch (error) {
      console.error('Error obteniendo transactionHandler:', error);
      throw error;
    }
  }
}
