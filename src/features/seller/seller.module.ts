// seler.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { Seller, SellerSchema } from './model/seller.scheme';
import { UserModel, UserSchema } from '../user/models/user.schema';
import { ContractsModule } from '../contracts/contracts.module';
import { PropertyModel, PropertySchema } from '../token-factory/model/properties-tokenFactory.schemes';

@Module({
  imports: [

    MongooseModule.forFeature([
      { name: Seller.name, schema: SellerSchema },
      { name: UserModel.name, schema: UserSchema },
      { name: PropertyModel.name, schema: PropertySchema },


    ]),
    ContractsModule
  ],
  controllers: [SellerController],
  providers: [SellerService],
  exports: [SellerService],

})
export class SelerModule {}
