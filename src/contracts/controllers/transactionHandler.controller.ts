import { Controller, Get, Post, Body } from '@nestjs/common';
import { TransactionHandlerService } from '../services/transaction-handler/transaction-handler.service';
import { BigNumber } from 'ethers';

@Controller('transaction-handler')
export class TransactionHandlerController {
  constructor(private readonly transactionHandlerService: TransactionHandlerService) {}

  @Get('commission-manager')
  async getCommissionManager(): Promise<string> {
    return this.transactionHandlerService.commissionManager();
  }

  @Post('handle')
  async handleTransaction(@Body('amount') amount: BigNumber): Promise<void> {
    return this.transactionHandlerService.handleTransaction(amount);
  }
}
