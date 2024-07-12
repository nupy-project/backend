/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CancelPaymentDto } from "./dto/cancel-payment.dto";
import { ConfirmPaymentDto } from "./dto/confirm-payment.dto";
import { ProcessPaymentDto } from "./dto/process-payment.dto";
import { RefundPaymentDto } from "./dto/refund-payment.dto";
import { Payment, PaymentDocument } from "./models/payment.scheme";
import { v4 as uuidv4 } from 'uuid'; // Importar uuidv4

@Injectable()
export class PaymentService {
  constructor(@InjectModel(Payment.name) private readonly paymentModel: Model<PaymentDocument>) {}

  public async processPayment(processPaymentDto: ProcessPaymentDto) {
    try {
      const newPayment = new this.paymentModel({
        ...processPaymentDto,
        status: 'pending',
        transactionId: uuidv4(), // Generar un transactionId único
      });
      await newPayment.save();
      return newPayment;
    } catch (error) {
      console.error('Error processing payment:', error);
      throw new HttpException('Error processing payment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async confirmPayment(confirmPaymentDto: ConfirmPaymentDto) {
    try {
      const payment = await this.paymentModel.findOneAndUpdate(
        { transactionId: confirmPaymentDto.transactionId },
        { status: 'confirmed' },
        { new: true },
      );
      if (!payment) {
        throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
      }
      return payment;
    } catch (error) {
      console.error('Error confirming payment:', error);
      throw new HttpException('Error confirming payment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async cancelPayment(cancelPaymentDto: CancelPaymentDto) {
    try {
      const payment = await this.paymentModel.findOneAndUpdate(
        { transactionId: cancelPaymentDto.transactionId },
        { status: 'cancelled' },
        { new: true },
      );
      if (!payment) {
        throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
      }
      return payment;
    } catch (error) {
      console.error('Error cancelling payment:', error);
      throw new HttpException('Error cancelling payment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async refundPayment(refundPaymentDto: RefundPaymentDto) {
    try {
      const payment = await this.paymentModel.findOneAndUpdate(
        { transactionId: refundPaymentDto.transactionId },
        { status: 'refunded' },
        { new: true },
      );
      if (!payment) {
        throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
      }
      return payment;
    } catch (error) {
      console.error('Error refunding payment:', error);
      throw new HttpException('Error refunding payment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async listPayments(page: number, limit: number) {
    try {
      const payments = await this.paymentModel.find().skip((page - 1) * limit).limit(limit);
      const totalPayments = await this.paymentModel.countDocuments();
      return { payments, total: totalPayments, page, limit };
    } catch (error) {
      console.error('Error listing payments:', error);
      throw new HttpException('Error listing payments', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getPaymentDetails(transactionId: string) {
    try {
      const payment = await this.paymentModel.findOne({ transactionId, status: { $ne: 'cancelled' } });
      // console.log('payment', payment);
      if (!payment) {
        throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
      }
      return payment;
    } catch (error) {
      console.error('Error getting payment details:', error);
      throw new HttpException('Error getting payment details', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  public async handleWebhookEvent(event: any) {
    try {
      // Manejar eventos de webhook aquí
    } catch (error) {
      console.error('Error handling webhook event:', error);
      throw new HttpException('Error handling webhook event', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async validatePayment(transactionId: string) {
    try {
      const payment = await this.paymentModel.findOne({ transactionId });
      if (!payment) {
        throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
      }
      // Agregar lógica de validación aquí
      return payment;
    } catch (error) {
      console.error('Error validating payment:', error);
      throw new HttpException('Error validating payment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async monitorPaymentStatus(transactionId: string) {
    try {
      const payment = await this.paymentModel.findOne({ transactionId });
      if (!payment) {
        throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
      }
      // Agregar lógica de monitoreo aquí
      return payment;
    } catch (error) {
      console.error('Error monitoring payment status:', error);
      throw new HttpException('Error monitoring payment status', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  
}
