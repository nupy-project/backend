import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { BuildingTokenService } from '../services/building-token/building-token.service';

@Controller('building-token')
export class BuildingTokenController {
  constructor(private readonly buildingTokenService: BuildingTokenService) {}

  @Get('balance/:address')
  async balanceOf(@Param('address') address: string): Promise<number> {
    return this.buildingTokenService.balanceOf(address);
  }

  @Get('owner/:tokenId')
  async ownerOf(@Param('tokenId') tokenId: number): Promise<string> {
    return this.buildingTokenService.ownerOf(tokenId);
  }

  @Post('transfer')
  async transfer(@Body() transferDto: { from: string; to: string; tokenId: number }): Promise<void> {
    return this.buildingTokenService.transferFrom(transferDto.from, transferDto.to, transferDto.tokenId);
  }
}
