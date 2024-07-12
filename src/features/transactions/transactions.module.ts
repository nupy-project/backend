import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Transaction, TransactionSchema } from './models/transaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }])
  ],
  providers: [TransactionsService],
  controllers: [TransactionsController],
  exports: [TransactionsService], // Asegúrate de que TransactionsService esté exportado
})
export class TransactionsModule {}
