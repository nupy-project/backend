/* eslint-disable @typescript-eslint/no-var-requires */
// src/properties/properties.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { ContractsModule } from '../contracts/contracts.module';
import { PropertyModel, PropertySchema } from './models/property.model';
import { UserModel, UserSchema } from 'src/user/models/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    MongooseModule.forFeatureAsync([
      {
        name: PropertyModel.name,
        useFactory: () => {
          const schema = PropertySchema;
          schema.plugin(require('mongoose-paginate-v2'));
          return schema;
        },
      },
    ]),
    ContractsModule,
  ],
  controllers: [PropertiesController],
  providers: [PropertiesService],
  exports: [PropertiesService],
})
export class PropertiesModule {}
