import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('create')
  async createTransaction(@Body() transactionData: any) {
    return await this.transactionsService.createTransaction(transactionData);
  }

  @Get()
  async getTransactions() {
    return await this.transactionsService.getTransactions();
  }

  @Get(':id')
  async getTransactionById(@Param('id') id: string) {
    return await this.transactionsService.getTransactionById(id);
  }
}
