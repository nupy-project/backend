import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { envs } from 'src/shared';
import { loadJSON } from 'src/shared/utils/json-loader.helper';
import { IOwnable } from '../../interfaces/IOwnable.interfaces';

@Injectable()
export class OwnableService {
  private contract: IOwnable;
  private provider: ethers.providers.JsonRpcProvider;
  private wallet: ethers.Wallet;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(envs.ETH_RPC_URL);
    this.wallet = new ethers.Wallet(envs.PRIVATE_KEY, this.provider);

    const contractAddress = envs.CONTRACT_ADDRESS;
    const contractABI = loadJSON().Ownable.abi;

    this.contract = new ethers.Contract(contractAddress, contractABI, this.wallet) as unknown as IOwnable;

    if (this.contract) {
      console.log('Métodos disponibles en el contrato Ownable:', Object.keys(this.contract));
    } else {
      console.error('El contrato Ownable no está correctamente inicializado.');
    }
  }

  async getOwner(): Promise<string> {
    try {
      const result = await this.contract.owner();
      console.log('owner', result);
      return result;
    } catch (error) {
      console.error('Error obteniendo el owner:', error);
      throw error;
    }
  }

  async renounceOwnership(): Promise<void> {
    try {
      const result = await this.contract.renounceOwnership();
      console.log('renounceOwnership', result);
    } catch (error) {
      console.error('Error renunciando a la propiedad:', error);
      throw error;
    }
  }

  async transferOwnership(newOwner: string): Promise<void> {
    try {
      const result = await this.contract.transferOwnership(newOwner);
      console.log('transferOwnership', result);
    } catch (error) {
      console.error('Error transfiriendo la propiedad:', error);
      throw error;
    }
  }
}
