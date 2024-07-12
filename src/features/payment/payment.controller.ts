import { Controller, Post, Put, Get, Param, Body, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiTags } from '@nestjs/swagger';
import { ProcessPaymentDto } from './dto/process-payment.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { CancelPaymentDto } from './dto/cancel-payment.dto';
import { RefundPaymentDto } from './dto/refund-payment.dto';

@ApiTags('payments')
@Controller('payments')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    
  ) {}

  @Post('process')
  processPayment(@Body() processPaymentDto: ProcessPaymentDto) {
    return this.paymentService.processPayment(processPaymentDto);
  }

  @Put('confirm')
  confirmPayment(@Body() confirmPaymentDto: ConfirmPaymentDto) {
    return this.paymentService.confirmPayment(confirmPaymentDto);
  }

  @Put('cancel')
  cancelPayment(@Body() cancelPaymentDto: CancelPaymentDto) {
    return this.paymentService.cancelPayment(cancelPaymentDto);
  }

  @Put('refund')
  refundPayment(@Body() refundPaymentDto: RefundPaymentDto) {
    return this.paymentService.refundPayment(refundPaymentDto);
  }

  @Get()
  listPayments(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.paymentService.listPayments(Number(page), Number(limit));
  }

  @Get(':transactionId')
  getPaymentDetails(@Param('transactionId') transactionId: string) {
    return this.paymentService.getPaymentDetails(transactionId);
  }

  @Post('webhook')
  handleWebhookEvent(@Body() event: any) {
    return this.paymentService.handleWebhookEvent(event);
  }

  @Get('validate/:transactionId')
  validatePayment(@Param('transactionId') transactionId: string) {
    return this.paymentService.validatePayment(transactionId);
  }

  @Get('monitor/:transactionId')
  monitorPaymentStatus(@Param('transactionId') transactionId: string) {
    return this.paymentService.monitorPaymentStatus(transactionId);
  }
}
