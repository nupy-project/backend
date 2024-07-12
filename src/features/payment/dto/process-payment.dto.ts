export class ProcessPaymentDto {
    userId: string;
    amount: number;
    currency: string;
    paymentMethod: string;
    description?: string;
  }