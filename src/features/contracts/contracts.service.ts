import { Injectable, OnModuleInit } from '@nestjs/common';
import { ethers } from 'ethers';
import { envs } from 'src/shared';
import { loadJSON } from 'src/shared/utils/json-loader.helper';
import { TransactionsService } from '../transactions/transactions.service';

@Injectable()
export class ContractsService implements OnModuleInit {
  private contracts: { [key: string]: ethers.Contract };
  public provider: ethers.providers.JsonRpcProvider;
  private wallet: ethers.Wallet;

  constructor(private transactionsService: TransactionsService) { // Inyectar TransactionsService
    this.provider = new ethers.providers.JsonRpcProvider();
    // this.provider = new ethers.providers.JsonRpcProvider(envs.ETH_RPC_URL);
    this.wallet = new ethers.Wallet(envs.PRIVATE_KEY, this.provider);

    const contractAddresses = {
      paymentProcessor:'',
      // paymentProcessor: envs.PAYMENT_CONTRACT_ADDRESS,
    };

    const contractABIs = loadJSON();

    this.contracts = {};
    for (const [name, address] of Object.entries(contractAddresses)) {
      this.contracts[name] = new ethers.Contract(address, contractABIs[name].abi, this.wallet);
    }

    for (const [name, contract] of Object.entries(this.contracts)) {
      console.log(`Métodos disponibles en el contrato ${name}:`, Object.keys(contract.functions));
    }
  }

  async onModuleInit() {
    this.contracts.paymentProcessor.on('PaymentReceived', async (payer, amount, timestamp, event) => {
      const transactionData = {
        payer,
        amount: ethers.utils.formatEther(amount),
        timestamp: timestamp.toNumber(),
        event: 'PaymentReceived',
        transactionHash: event.transactionHash,
      };
      await this.transactionsService.createTransaction(transactionData);
    });

    this.contracts.paymentProcessor.on('PaymentRefunded', async (payer, amount, timestamp, event) => {
      const transactionData = {
        payer,
        amount: ethers.utils.formatEther(amount),
        timestamp: timestamp.toNumber(),
        event: 'PaymentRefunded',
        transactionHash: event.transactionHash,
      };
      await this.transactionsService.createTransaction(transactionData);
    });
  }

  async processPayment(amount: number): Promise<any> {
    try {
      const tx = await this.contracts.paymentProcessor.processPayment({
        value: ethers.utils.parseEther(amount.toString()),
      });
      console.log('Transaction sent:', tx);
      await tx.wait(); // Esperar a que la transacción se confirme
      console.log('Transaction confirmed:', tx);
      return tx;
    } catch (error) {
      console.error('Error processing payment:', error);
      throw new Error('Failed to process payment');
    }
  }

  async refundPayment(address: string, amount: number): Promise<any> {
    try {
      const tx = await this.contracts.paymentProcessor.refundPayment(
        address,
        ethers.utils.parseEther(amount.toString())
      );
      console.log('Refund transaction sent:', tx);
      await tx.wait(); // Esperar a que la transacción se confirme
      console.log('Refund transaction confirmed:', tx);
      return tx;
    } catch (error) {
      console.error('Error refunding payment:', error);
      throw new Error('Failed to refund payment');
    }
  }
}
