import { Module } from '@nestjs/common';
import { ContractManagerService } from './contract-manager.service';
import { ContractManagerController } from './contract-manager.controller';

@Module({
  controllers: [ContractManagerController],
  providers: [ContractManagerService],
})
export class ContractManagerModule {}
