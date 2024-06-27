import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { envs } from 'src/shared';
import { loadJSON } from 'src/shared/utils/json-loader.helper';
import { IBuildingToken } from '../contracts';

@Injectable()
export class BuildingTokenService {
  private contract: IBuildingToken;
  private provider: ethers.providers.JsonRpcProvider;
  private wallet: ethers.Wallet;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(envs.ETH_RPC_URL);
    this.wallet = new ethers.Wallet(envs.PRIVATE_KEY, this.provider);

    const contractAddress = envs.BUILDING_TOKEN_ADDRESS;
    const contractABI = loadJSON().BuildingToken.abi;

    this.contract = new ethers.Contract(contractAddress, contractABI, this.wallet) as unknown as IBuildingToken;

    if (this.contract) {
      console.log('Métodos disponibles en el contrato BuildingToken:', Object.keys(this.contract));
    } else {
      console.error('El contrato BuildingToken no está correctamente inicializado.');
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

  async approve(to: string, tokenId: number): Promise<void> {
    try {
      await this.contract.approve(to, tokenId);
      console.log('approve', { to, tokenId });
    } catch (error) {
      console.error('Error en approve:', error);
      throw error;
    }
  }

  async balanceOf(owner: string): Promise<number> {
    try {
      const result = await this.contract.balanceOf(owner);
      console.log('balanceOf', result);
      return result;
    } catch (error) {
      console.error('Error en balanceOf:', error);
      throw error;
    }
  }

  async getApproved(tokenId: number): Promise<string> {
    try {
      const result = await this.contract.getApproved(tokenId);
      console.log('getApproved', result);
      return result;
    } catch (error) {
      console.error('Error en getApproved:', error);
      throw error;
    }
  }

  async isApprovedForAll(owner: string, operator: string): Promise<boolean> {
    try {
      const result = await this.contract.isApprovedForAll(owner, operator);
      console.log('isApprovedForAll', result);
      return result;
    } catch (error) {
      console.error('Error en isApprovedForAll:', error);
      throw error;
    }
  }

  async name(): Promise<string> {
    try {
      const result = await this.contract.name();
      console.log('name', result);
      return result;
    } catch (error) {
      console.error('Error en name:', error);
      throw error;
    }
  }

  async nextTokenId(): Promise<number> {
    try {
      const result = await this.contract.nextTokenId();
      console.log('nextTokenId', result);
      return result;
    } catch (error) {
      console.error('Error en nextTokenId:', error);
      throw error;
    }
  }

  async ownerOf(tokenId: number): Promise<string> {
    try {
      const result = await this.contract.ownerOf(tokenId);
      console.log('ownerOf', result);
      return result;
    } catch (error) {
      console.error('Error en ownerOf:', error);
      throw error;
    }
  }

  async safeTransferFrom(from: string, to: string, tokenId: number): Promise<void> {
    try {
      await this.contract.safeTransferFrom(from, to, tokenId);
      console.log('safeTransferFrom', { from, to, tokenId });
    } catch (error) {
      console.error('Error en safeTransferFrom:', error);
      throw error;
    }
  }

  async safeTransferFromWithData(from: string, to: string, tokenId: number, data: string): Promise<void> {
    try {
      await this.contract.safeTransferFrom(from, to, tokenId, data);
      console.log('safeTransferFromWithData', { from, to, tokenId, data });
    } catch (error) {
      console.error('Error en safeTransferFromWithData:', error);
      throw error;
    }
  }

  async setApprovalForAll(operator: string, approved: boolean): Promise<void> {
    try {
      await this.contract.setApprovalForAll(operator, approved);
      console.log('setApprovalForAll', { operator, approved });
    } catch (error) {
      console.error('Error en setApprovalForAll:', error);
      throw error;
    }
  }

  async supportsInterface(interfaceId: string): Promise<boolean> {
    try {
      const result = await this.contract.supportsInterface(interfaceId);
      console.log('supportsInterface', result);
      return result;
    } catch (error) {
      console.error('Error en supportsInterface:', error);
      throw error;
    }
  }

  async symbol(): Promise<string> {
    try {
      const result = await this.contract.symbol();
      console.log('symbol', result);
      return result;
    } catch (error) {
      console.error('Error en symbol:', error);
      throw error;
    }
  }

  async tokenURI(tokenId: number): Promise<string> {
    try {
      const result = await this.contract.tokenURI(tokenId);
      console.log('tokenURI', result);
      return result;
    } catch (error) {
      console.error('Error en tokenURI:', error);
      throw error;
    }
  }

  async transferFrom(from: string, to: string, tokenId: number): Promise<void> {
    try {
      await this.contract.transferFrom(from, to, tokenId);
      console.log('transferFrom', { from, to, tokenId });
    } catch (error) {
      console.error('Error en transferFrom:', error);
      throw error;
    }
  }

  async mint(to: string): Promise<void> {
    try {
      await this.contract.mint(to);
      console.log('mint', to);
    } catch (error) {
      console.error('Error en mint:', error);
      throw error;
    }
  }
}
