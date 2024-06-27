import { Module } from '@nestjs/common';
import { TokenFactoryService } from './token-factory.service';
import { TokenFactoryController } from './token-factory.controller';

@Module({
  controllers: [TokenFactoryController],
  providers: [TokenFactoryService],
})
export class TokenFactoryModule {}
