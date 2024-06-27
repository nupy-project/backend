import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { ITokenFactory } from 'src/contracts';
import { envs, loadJSON } from 'src/shared';

@Injectable()
export class TokenFactoryService {
  private contract: ITokenFactory;
  private provider: ethers.providers.JsonRpcProvider;
  private wallet: ethers.Wallet;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(envs.ETH_RPC_URL);
    this.wallet = new ethers.Wallet(envs.PRIVATE_KEY, this.provider);

    const contractAddress = envs.TOKEN_FACTORY_ADDRESS;
    const contractABI = loadJSON().TokenFactory.abi;

    this.contract = new ethers.Contract(contractAddress, contractABI, this.wallet) as unknown as ITokenFactory;

    if (this.contract) {
      console.log('Métodos disponibles en el contrato TokenFactory:', Object.keys(this.contract));
    } else {
      console.error('El contrato TokenFactory no está correctamente inicializado.');
    }
  }

  async owner(): Promise<string> {
    try {
      const owner = await this.contract.owner();
      console.log('owner', owner);
      return owner;
    } catch (error) {
      console.error('Error en owner:', error);
      throw error;
    }
  }

  async propertyTokenAddress(): Promise<string> {
    try {
      const address = await this.contract.propertyTokenAddress();
      console.log('propertyTokenAddress', address);
      return address;
    } catch (error) {
      console.error('Error en propertyTokenAddress:', error);
      throw error;
    }
  }

  async renounceOwnership(): Promise<void> {
    try {
      await this.contract.renounceOwnership();
      console.log('renounceOwnership');
    } catch (error) {
      console.error('Error en renounceOwnership:', error);
      throw error;
    }
  }

  async transferOwnership(newOwner: string): Promise<void> {
    try {
      await this.contract.transferOwnership(newOwner);
      console.log('transferOwnership');
    } catch (error) {
      console.error('Error en transferOwnership:', error);
      throw error;
    }
  }

  async createPropertyToken(): Promise<void> {
    try {
      await this.contract.createPropertyToken();
      console.log('createPropertyToken');
    } catch (error) {
      console.error('Error en createPropertyToken:', error);
      throw error;
    }
  }
}
