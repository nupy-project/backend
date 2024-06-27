import { Controller, Get, Post, Body } from '@nestjs/common';
import { OwnableService } from '../services/ownable/ownable.service';

@Controller('ownable')
export class OwnableController {
  constructor(private readonly ownableService: OwnableService) {}

  @Get('owner')
  async getOwner(): Promise<string> {
    return this.ownableService.getOwner();
  }

  @Post('transfer')
  async transferOwnership(@Body('newOwner') newOwner: string): Promise<void> {
    return this.ownableService.transferOwnership(newOwner);
  }
}
