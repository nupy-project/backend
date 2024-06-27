import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { PropertyTokenService } from '../services/property-token/property-token.service';
import { BigNumber } from 'ethers';

@Controller('property-token')
export class PropertyTokenController {
  constructor(private readonly propertyTokenService: PropertyTokenService) {}

  @Get('balance/:address')
  async balanceOf(@Param('address') address: string): Promise<BigNumber> {
    return this.propertyTokenService.balanceOf(address);
  }

  @Get('owner/:tokenId')
  async ownerOf(@Param('tokenId') tokenId: BigNumber): Promise<string> {
    return this.propertyTokenService.ownerOf(tokenId);
  }

  @Post('transfer')
  async transfer(@Body() transferDto: { from: string; to: string; tokenId: BigNumber }): Promise<void> {
    return this.propertyTokenService.transferFrom(transferDto.from, transferDto.to, transferDto.tokenId);
  }
}
