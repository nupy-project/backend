import { Module } from '@nestjs/common';
import { PropertyTokenService } from './property-token.service';
import { PropertyTokenController } from './property-token.controller';

@Module({
  controllers: [PropertyTokenController],
  providers: [PropertyTokenService],
})
export class PropertyTokenModule {}
