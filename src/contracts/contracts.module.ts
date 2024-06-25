import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ConfigModule } from '@nestjs/config';
import { ContractsController } from './contracts.controller';

@Module({
  imports: [ConfigModule],
  controllers: [ContractsController],
  providers: [ContractsService],
  exports: [ContractsService],

})
export class ContractsModule {}
