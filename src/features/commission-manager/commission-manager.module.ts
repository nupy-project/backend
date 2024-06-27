import { Module } from '@nestjs/common';
import { CommissionManagerService } from './commission-manager.service';
import { CommissionManagerController } from './commission-manager.controller';

@Module({
  controllers: [CommissionManagerController],
  providers: [CommissionManagerService],
})
export class CommissionManagerModule {}
