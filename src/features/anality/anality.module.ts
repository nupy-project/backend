import { Module } from '@nestjs/common';
import { AnalityService } from './anality.service';
import { AnalityController } from './anality.controller';

@Module({
  controllers: [AnalityController],
  providers: [AnalityService],
})
export class AnalityModule {}
