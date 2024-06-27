import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderSchema } from './models/order.schemes';
import { UserModel, UserSchema } from '../user/models/user.schema';
import { PropertyModel, PropertySchema } from '../token-factory/model/properties-tokenFactory.schemes';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrderModule.name, schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: PropertyModel.name, schema: PropertySchema }]),
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
