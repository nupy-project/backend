import { Controller, Get } from '@nestjs/common';
import { ContractManagerService } from 'src/features/contract-manager/contract-manager.service';

@Controller('contract-manager')
export class ContractManagerController {
  constructor(private readonly contractManagerService: ContractManagerService) {}

  @Get('access-control')
  async getAccessControl(): Promise<string> {
    return this.contractManagerService.accessControl();
  }

  @Get('commission-manager')
  async getCommissionManager(): Promise<string> {
    return this.contractManagerService.commissionManager();
  }
}
