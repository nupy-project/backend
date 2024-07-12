import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtHandle, JwtStrategy } from 'src/shared';
import { UserModel, UserSchema } from '../user/models/user.schema';
import { CloudinaryModule } from 'src/shared/modules/cloudinary.module';
import { SessionModel, SessionSchema } from '../user/models/session.schema';
import { AuthSchema,AuthModel} from './model/auth.scheme';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          signOptions: { expiresIn: '4d' },
          secret: process.env.JWT_SECRET,
        };
      },
    }),
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
      { name: AuthModel.name, schema: AuthSchema },
      { name: SessionModel.name, schema: SessionSchema },

    ]),
    CloudinaryModule, // Importar el módulo de Cloudinary
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtHandle],
  exports: [JwtHandle],
})
export class AuthModule {}
