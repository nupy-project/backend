import { Injectable } from '@nestjs/common';
import { ethers, BigNumber } from 'ethers';
import { IPropertyToken } from 'src/contracts';
import { envs, loadJSON } from 'src/shared';

@Injectable()
export class PropertyTokenService {
  private contract: IPropertyToken;
  private provider: ethers.providers.JsonRpcProvider;
  private wallet: ethers.Wallet;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(envs.ETH_RPC_URL);
    this.wallet = new ethers.Wallet(envs.PRIVATE_KEY, this.provider);

    const contractAddress = envs.PROPERTY_TOKEN_ADDRESS;
    const contractABI = loadJSON().PropertyToken.abi;

    this.contract = new ethers.Contract(contractAddress, contractABI, this.wallet) as unknown as IPropertyToken;

    if (this.contract) {
      console.log('Métodos disponibles en el contrato PropertyToken:', Object.keys(this.contract));
    } else {
      console.error('El contrato PropertyToken no está correctamente inicializado.');
    }
  }

  async approve(to: string, tokenId: BigNumber): Promise<void> {
    try {
      await this.contract.approve(to, tokenId);
      console.log('approve');
    } catch (error) {
      console.error('Error en approve:', error);
      throw error;
    }
  }

  async balanceOf(owner: string): Promise<BigNumber> {
    try {
      const balance = await this.contract.balanceOf(owner);
      console.log('balanceOf', balance);
      return balance;
    } catch (error) {
      console.error('Error en balanceOf:', error);
      throw error;
    }
  }

  async getApproved(tokenId: BigNumber): Promise<string> {
    try {
      const approved = await this.contract.getApproved(tokenId);
      console.log('getApproved', approved);
      return approved;
    } catch (error) {
      console.error('Error en getApproved:', error);
      throw error;
    }
  }

  async isApprovedForAll(owner: string, operator: string): Promise<boolean> {
    try {
      const approved = await this.contract.isApprovedForAll(owner, operator);
      console.log('isApprovedForAll', approved);
      return approved;
    } catch (error) {
      console.error('Error en isApprovedForAll:', error);
      throw error;
    }
  }

  async name(): Promise<string> {
    try {
      const name = await this.contract.name();
      console.log('name', name);
      return name;
    } catch (error) {
      console.error('Error en name:', error);
      throw error;
    }
  }

  async nextTokenId(): Promise<BigNumber> {
    try {
      const nextTokenId = await this.contract.nextTokenId();
      console.log('nextTokenId', nextTokenId);
      return nextTokenId;
    } catch (error) {
      console.error('Error en nextTokenId:', error);
      throw error;
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

  async ownerOf(tokenId: BigNumber): Promise<string> {
    try {
      const owner = await this.contract.ownerOf(tokenId);
      console.log('ownerOf', owner);
      return owner;
    } catch (error) {
      console.error('Error en ownerOf:', error);
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

  async safeTransferFrom(from: string, to: string, tokenId: BigNumber): Promise<void> {
    try {
      await this.contract.safeTransferFrom(from, to, tokenId);
      console.log('safeTransferFrom');
    } catch (error) {
      console.error('Error en safeTransferFrom:', error);
      throw error;
    }
  }

  async safeTransferFromWithData(from: string, to: string, tokenId: BigNumber, data: string): Promise<void> {
    try {
      await this.contract.safeTransferFrom(from, to, tokenId, data);
      console.log('safeTransferFromWithData');
    } catch (error) {
      console.error('Error en safeTransferFromWithData:', error);
      throw error;
    }
  }

  async setApprovalForAll(operator: string, approved: boolean): Promise<void> {
    try {
      await this.contract.setApprovalForAll(operator, approved);
      console.log('setApprovalForAll');
    } catch (error) {
      console.error('Error en setApprovalForAll:', error);
      throw error;
    }
  }

  async supportsInterface(interfaceId: string): Promise<boolean> {
    try {
      const supported = await this.contract.supportsInterface(interfaceId);
      console.log('supportsInterface', supported);
      return supported;
    } catch (error) {
      console.error('Error en supportsInterface:', error);
      throw error;
    }
  }

  async symbol(): Promise<string> {
    try {
      const symbol = await this.contract.symbol();
      console.log('symbol', symbol);
      return symbol;
    } catch (error) {
      console.error('Error en symbol:', error);
      throw error;
    }
  }

  async tokenURI(tokenId: BigNumber): Promise<string> {
    try {
      const uri = await this.contract.tokenURI(tokenId);
      console.log('tokenURI', uri);
      return uri;
    } catch (error) {
      console.error('Error en tokenURI:', error);
      throw error;
    }
  }

  async transferFrom(from: string, to: string, tokenId: BigNumber): Promise<void> {
    try {
      await this.contract.transferFrom(from, to, tokenId);
      console.log('transferFrom');
    } catch (error) {
      console.error('Error en transferFrom:', error);
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

  async mint(to: string): Promise<void> {
    try {
      await this.contract.mint(to);
      console.log('mint');
    } catch (error) {
      console.error('Error en mint:', error);
      throw error;
    }
  }
}
