/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './shared';
import { AuthModule } from './features/auth/auth.module';
// import { TransactionsModule } from './features/transactions/transactions.module';
// import { ContractsModule } from './features/contracts/contracts.module';


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
    // ContractsModule,
    // TransactionsModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
