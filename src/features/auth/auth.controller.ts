import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UserRole } from '../user/interfaces/roles.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  handleLogin(@Body() loginBody: LoginAuthDto) {
    return this.authService.login(loginBody);
  }

  @Post('signup/buyer')
  registerBuyer(@Body() registerBody: RegisterAuthDto) {
    return this.authService.registerBuyer(registerBody, UserRole.Buyer);
  }

  @Post('signup/seller')
  registerSeller(@Body() registerBody: RegisterAuthDto) {
    return this.authService.registerSeller(registerBody, UserRole.Seller);
  }

  @Post('signup/admin')
  registerAdmin(@Body() registerBody: RegisterAuthDto) {
    return this.authService.registerAdmin(registerBody, UserRole.Admin);
  }

  @Post('signup/super-admin')
  registerSuperAdmin(@Body() registerBody: RegisterAuthDto) {
    return this.authService.registerSuperAdmin(registerBody, UserRole.SuperAdmin);
  }

  @Post('signup/super-admin-ceo')
  registerSuperAdminCeo(@Body() registerBody: RegisterAuthDto) {
    return this.authService.registerSuperAdminCeo(registerBody, UserRole.SuperAdminCeo);
  }
}
