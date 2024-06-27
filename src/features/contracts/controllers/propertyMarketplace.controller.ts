import { Controller, Get, Post, Body } from '@nestjs/common';
import { PropertyMarketplaceService } from '../services/property-marketplace/property-marketplace.service';
import { BigNumber } from 'ethers';

@Controller('property-marketplace')
export class PropertyMarketplaceController {
  constructor(private readonly propertyMarketplaceService: PropertyMarketplaceService) {}

  @Get('count')
  async getPropertieCount(): Promise<BigNumber> {
    return this.propertyMarketplaceService.getPropertieCount();
  }

  @Post('create')
  async createProperty(@Body() createPropertyDto: { price: BigNumber; proof: string }): Promise<any> {
    return this.propertyMarketplaceService.createProperty(createPropertyDto.price, createPropertyDto.proof);
  }

  @Post('buy')
  async comprarPropiedad(@Body() buyPropertyDto: { propertyHash: string; promoter: string; value: string }): Promise<void> {
    const valueBigNumber = BigNumber.from(buyPropertyDto.value);
    return this.propertyMarketplaceService.comprarPropiedad(buyPropertyDto.propertyHash, buyPropertyDto.promoter, valueBigNumber);
  }
}
