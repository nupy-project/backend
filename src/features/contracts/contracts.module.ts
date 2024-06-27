import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ConfigModule } from '@nestjs/config';
import { ContractsController } from './controllers/contracts.controller';
import { AccessControlService } from './services/access-control/access-control.service';

import { MarketplaceService } from './services/marketplace/marketplace.service';
import { PropertyMarketplaceService } from './services/property-marketplace/property-marketplace.service';

import { OwnableService } from './services/ownable/ownable.service';
import { BuildingTokenService } from '../building-token/building-token.service';
import { CommissionManagerService } from '../commission-manager/commission-manager.service';
import { ContractManagerService } from '../contract-manager/contract-manager.service';
import { PropertyTokenService } from '../property-token/property-token.service';
import { TokenFactoryService } from '../token-factory/token-factory.service';
import { TransactionHandlerService } from '../transaction-handler/transaction-handler.service';


@Module({
  imports: [ConfigModule],
  controllers: [ContractsController],
  providers: [
    ContractsService,
    AccessControlService,
    BuildingTokenService,
    CommissionManagerService,
    ContractManagerService,
    MarketplaceService,
    PropertyMarketplaceService,
    TokenFactoryService,
    TransactionHandlerService,
    PropertyTokenService,
    OwnableService,
  ],
  exports: [
    ContractsService,
    // AccessControlService,
    // BuildingTokenService,
    // CommissionManagerService,
    // ContractManagerService,
    // MarketplaceService,
    // PropertyMarketplaceService,
    // TokenFactoryService,
    TransactionHandlerService,
  ],
})
export class ContractsModule {}
