import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ConfigModule } from '@nestjs/config';
import { ContractsController } from './contracts.controller';
import { AccessControlService } from './services/access-control/access-control.service';
import { BuildingTokenService } from './services/building-token/building-token.service';
import { CommissionManagerService } from './services/commission-manager/commission-manager.service';
import { ContractManagerService } from './services/contract-manager/contract-manager.service';
import { MarketplaceService } from './services/marketplace/marketplace.service';
import { PropertyMarketplaceService } from './services/property-marketplace/property-marketplace.service';
import { TokenFactoryService } from './services/token-factory/token-factory.service';
import { TransactionHandlerService } from './services/transaction-handler/transaction-handler.service';

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
  ],
  exports: [
    ContractsService,
    AccessControlService,
    BuildingTokenService,
    CommissionManagerService,
    ContractManagerService,
    MarketplaceService,
    PropertyMarketplaceService,
    TokenFactoryService,
    TransactionHandlerService,
  ],
})
export class ContractsModule {}
