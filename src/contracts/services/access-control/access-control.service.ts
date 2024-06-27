import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { IAccessControl } from 'src/contracts';
import { envs, loadJSON } from 'src/shared';

@Injectable()
export class AccessControlService {
    private contract: IAccessControl;
    private provider: ethers.providers.JsonRpcProvider;
    private wallet: ethers.Wallet;


    constructor() {
        this.provider = new ethers.providers.JsonRpcProvider(envs.ETH_RPC_URL);
        this.wallet = new ethers.Wallet(envs.PRIVATE_KEY, this.provider);
    
        const contractAddress = envs.ACCESS_CONTROL_ADDRESS;
        const contractABI = loadJSON().AccessControl.abi;
    
        this.contract = new ethers.Contract(contractAddress, contractABI, this.wallet) as unknown as IAccessControl;
    
        if (this.contract) {
          console.log('Métodos disponibles en el contrato AccessControl:', Object.keys(this.contract));
        } else {
          console.error('El contrato AccessControl no está correctamente inicializado.');
        }
      }
    
      async admins(address: string): Promise<boolean> {
        try {
          const result = await this.contract.admins(address);
          console.log('admins', result);
          return result;
        } catch (error) {
          console.error('Error obteniendo admins:', error);
          throw error;
        }
      }
    
      async addAdmin(account: string): Promise<void> {
        try {
          await this.contract.addAdmin(account);
          console.log('addAdmin', account);
        } catch (error) {
          console.error('Error añadiendo admin:', error);
          throw error;
        }
      }
    
      async removeAdmin(account: string): Promise<void> {
        try {
          await this.contract.removeAdmin(account);
          console.log('removeAdmin', account);
        } catch (error) {
          console.error('Error removiendo admin:', error);
          throw error;
        }
      }
}
