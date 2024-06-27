import { Controller, Get } from '@nestjs/common';
import { CommissionManagerService } from './commission-manager.service';

@Controller('commission-manager')
export class CommissionManagerController {
  constructor(private readonly commissionManagerService: CommissionManagerService) {}

  @Get('platform-commission')
  async getPlatformCommission(): Promise<number> {
    return this.commissionManagerService.platformCommission();
  }

  @Get('promoter-commission')
  async getPromoterCommission(): Promise<number> {
    return this.commissionManagerService.promoterCommission();
  }
}
