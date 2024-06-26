import { Controller, Get, Post, Body } from '@nestjs/common';
import { ContractsService } from './contracts.service';
// import { ethers } from 'ethers';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post('create-property')
  async createProperty(@Body() body: any) {
    const { price } = body;
    return this.contractsService.createProperty(price);
  }

  // @Post('comprar-propiedad')
  // async comprarPropiedad(@Body() body: any) {
  //   const { propiertieId, proof, promoter, value } = body;
  //   return this.contractsService.comprarPropiedad(propiertieId, proof, promoter, ethers.BigNumber.from(value));
  // }

  // @Post('transferir-propiedad')
  // async transferirPropiedad(@Body() body: any) {
  //   const { propertieHash, to } = body;
  //   return this.contractsService.transferirPropiedad(propertieHash, to);
  // }

  // @Get('properties/count')
  // async getPropertieCount() {
  //   return this.contractsService.getPropertieCount();
  // }
  @Get('propertie-count')
  async getPropertieCount() {
    const count = await this.contractsService.getPropertieCount();
    return { count: count.toString() }; // Asegurarse de devolver el valor como string
  }

  // @Get('properties/hash/:index')
  // async getPropertieHashAtIndex(@Param('index') index: number) {
  //   return this.contractsService.getPropertieHashAtIndex(index);
  // }


  // @Get('properties/:hash')
  // async getPropertieByHash(@Param('hash') hash: string) {
  //   return this.contractsService.getPropertieByHash(hash);
  // }


  @Get('signer-address')
  async getSignerAddress() {
    const address = await this.contractsService.getSignerAddress();
    return { address };
  }
  @Get('balance')
  async getBalance(): Promise<{ address: string; balance: string }> {
    return await this.contractsService.getBalance();
  }
  // @Get('platform-commission')
  // async getPlatformCommission() {
  //   const result = await this.contractsService.getPlatformCommissionPercentage();
  //   return { commission: result };
  // }

  // @Get('promoter-commission')
  // async getPromoterCommission() {
  //   const result = await this.contractsService.getPromoterCommissionPercentage();
  //   return { commission: result };
  // }

  // @Post('set-platform-commission')
  // async setPlatformCommission(@Body('percentage') percentage: number) {
  //   const result = await this.contractsService.setPlatformCommissionPercentage(percentage);
  //   return { transaction: result };
  // }

  // @Post('set-promoter-commission')
  // async setPromoterCommission(@Body('percentage') percentage: number) {
  //   const result = await this.contractsService.setPromoterCommissionPercentage(percentage);
  //   return { transaction: result };
  // }

}
