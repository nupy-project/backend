import { Module } from '@nestjs/common';
import { BuildingTokenService } from './building-token.service';
import { BuildingTokenController } from './building-token.controller';

@Module({
  controllers: [BuildingTokenController],
  providers: [BuildingTokenService],
})
export class BuildingTokenModule {}
