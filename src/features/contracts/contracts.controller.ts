import { Controller, Post, Body } from '@nestjs/common';
import { ContractsService } from './contracts.service';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post('process')
  async processPayment(@Body('amount') amount: number) {
    return await this.contractsService.processPayment(amount);
  }

  @Post('refund')
  async refundPayment(
    @Body('address') address: string,
    @Body('amount') amount: number
  ) {
    return await this.contractsService.refundPayment(address, amount);
  }
}
