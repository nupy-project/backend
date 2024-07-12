import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './models/transaction.schema';

@Injectable()
export class TransactionsService {
  constructor(@InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>) {}

  async createTransaction(transactionData: any): Promise<Transaction> {
    const transaction = new this.transactionModel(transactionData);
    return await transaction.save();
  }

  async getTransactions(): Promise<Transaction[]> {
    return await this.transactionModel.find().exec();
  }

  async getTransactionById(id: string): Promise<Transaction> {
    return await this.transactionModel.findById(id).exec();
  }
}
