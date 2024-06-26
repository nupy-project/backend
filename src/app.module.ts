/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
// import { SellerModule } from './seller/seller.module';
// import { BuyerModule } from './buyer/buyer.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './shared';
import { UserModule } from './user/user.module';
// import { UserModule } from './user/user.module';
// import { PropertiesModule } from './properties/properties.module';
import { ContractsModule } from './contracts/contracts.module';
import { PropertiesModule } from './properties/properties.module';
import { OrderModule } from './order/order.module';


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
    UserModule,
    PropertiesModule,
    ContractsModule,
    OrderModule, 
    // SellerModule, 
    // BuyerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
