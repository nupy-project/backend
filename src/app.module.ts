/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
// import { SellerModule } from './seller/seller.module';
// import { BuyerModule } from './buyer/buyer.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './shared';
import { AuthModule } from './features/auth/auth.module';
// import { BuildingTokenModule } from './features/building-token/building-token.module';
// import { CommissionManagerModule } from './features/commission-manager/commission-manager.module';
// import { ContractManagerModule } from './features/contract-manager/contract-manager.module';
// import { MarketplaceModule } from './features/marketplace/marketplace.module';
// import { PropertyTokenModule } from './features/property-token/property-token.module';
// import { TokenFactoryModule } from './features/token-factory/token-factory.module';
// import { TransactionHandlerModule } from './features/transaction-handler/transaction-handler.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(envs.databaseUrl, {
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-delete'), {
          overrideMethods: 'all',
        });
        return connection;
      },
    }),
    AuthModule,
    // BuildingTokenModule,
    // CommissionManagerModule,
    // ContractManagerModule,
    // MarketplaceModule,
    // TokenFactoryModule,
    // TransactionHandlerModule,
    // PropertyTokenModule,
    // UserModule,
    // PropertiesModule,
    // ContractsModule,
    // OrderModule, 
    // SellerModule, 
    // BuyerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
