import { Controller,Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // current-user
  // password
  // signin
  // signout
  // signup

  @Post('signup')
  handleRegister(@Body() registerBody: RegisterAuthDto) {
    console.log('Received POST /auth/signup');
    console.log('Request body:', registerBody);
    return this.authService.register(registerBody);
  }
  @Post('signin')
  handleLogin(@Body() loginBody: LoginAuthDto) {
    console.log('Received POST /auth/signin');
    console.log('Request body:', loginBody);
    return this.authService.login(loginBody);
  }

}
