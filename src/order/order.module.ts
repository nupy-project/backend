import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PropertyModel, PropertySchema } from 'src/properties/models/property.model';
import { UserModel, UserSchema } from 'src/user/models/user.schema';
import { OrderSchema } from './models/order.schemes';

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
