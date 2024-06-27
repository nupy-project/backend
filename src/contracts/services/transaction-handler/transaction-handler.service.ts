import { Injectable } from '@nestjs/common';
import { ethers, BigNumber } from 'ethers';
import { ITransactionHandler } from 'src/contracts';
import { envs, loadJSON } from 'src/shared';

@Injectable()
export class TransactionHandlerService {
  private contract: ITransactionHandler;
  private provider: ethers.providers.JsonRpcProvider;
  private wallet: ethers.Wallet;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(envs.ETH_RPC_URL);
    this.wallet = new ethers.Wallet(envs.PRIVATE_KEY, this.provider);

    const contractAddress = envs.TRANSACTION_HANDLER_ADDRESS;
    const contractABI = loadJSON().TransactionHandler.abi;

    this.contract = new ethers.Contract(contractAddress, contractABI, this.wallet) as unknown as ITransactionHandler;

    if (this.contract) {
      console.log('Métodos disponibles en el contrato TransactionHandler:', Object.keys(this.contract));
    } else {
      console.error('El contrato TransactionHandler no está correctamente inicializado.');
    }
  }

  async commissionManager(): Promise<string> {
    try {
      const manager = await this.contract.commissionManager();
      console.log('commissionManager', manager);
      return manager;
    } catch (error) {
      console.error('Error en commissionManager:', error);
      throw error;
    }
  }

  async handleTransaction(amount: BigNumber): Promise<void> {
    try {
      await this.contract.handleTransaction(amount);
      console.log('handleTransaction');
    } catch (error) {
      console.error('Error en handleTransaction:', error);
      throw error;
    }
  }
}
