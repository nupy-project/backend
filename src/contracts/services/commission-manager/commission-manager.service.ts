import { Injectable } from '@nestjs/common';

import { ethers } from 'ethers';
import { envs } from 'src/shared';
import { loadJSON } from 'src/shared/utils/json-loader.helper';


@Injectable()
export class CommissionManagerService {

    private contract: ethers.Contract;
    private provider: ethers.providers.JsonRpcProvider;
    private wallet: ethers.Wallet;

    constructor(){
        this.provider = new ethers.providers.JsonRpcProvider(envs.ETH_RPC_URL);
        this.wallet = new ethers.Wallet(envs.PRIVATE_KEY, this.provider);

        const contractAddress = envs.ACCESS_CONTROL_ADDRESS;
        const contractABI = loadJSON().AccessControl.abi; 
        
        
        // console.log('ETH_RPC_URL:', envs.ETH_RPC_URL);
        // console.log('Contract Address:', contractAddress);
        // console.log('Contract ABI:', contractABI);

        this.contract = new ethers.Contract(contractAddress, contractABI, this.wallet);

        if (this.contract && this.contract.functions) {
          console.log('Métodos disponibles en el contrato AccessControl:', Object.keys(this.contract.functions));
        } else {
          console.error('El contrato AccessControl no está correctamente inicializado.');
        }
      
    }
}
