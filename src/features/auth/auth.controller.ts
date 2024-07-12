import { Controller, Post, Body, Delete, Get, Param, UseGuards, Req, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { JwtGuard } from 'src/shared';
import { Request } from 'express'; // Importar Request de express
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  
  handleLogin(@Body() loginBody: LoginAuthDto) {
    console.log('Datos recibidos en /auth/signin:', loginBody); // Añade esta línea

    return this.authService.login(loginBody);
  }

  @Post('register')
  registerSuperAdmin(@Body() registerBody: RegisterAuthDto) {
    console.log('Datos recibidos en /auth/register:', registerBody); // Añade esta línea

    return this.authService.register(registerBody);
  }
  @UseGuards(JwtGuard)
  @Get('current-user')
  @ApiBearerAuth()
  public async getCurrentUser(@Req() req: Request) {
    const token = req.headers.authorization.split(' ')[1];
    return this.authService.currentUser(token);
  }


  @Post('logout')
  logout(@Body('token') token: string, @Body('userId') userId: string) {
    return this.authService.logout(token, userId);
  }

  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    console.log('RefreshTokenDto',RefreshTokenDto)
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }

  @Post('update-password')
  updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    return this.authService.updatePassword(updatePasswordDto);
  }

  @Get('verify-email/:token')
  verifyEmail(@Param('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  // @Post('refresh-token')
  // refreshToken(@Body('refreshToken') refreshToken: string) {
  //   return this.authService.refreshToken(refreshToken);
  // }

  @Get('sessions')
  getSessions(@Body('userId') userId: string) {
    return this.authService.getSessions(userId);
  }

  @Delete('sessions/:sessionId')
  deleteSession(@Param('sessionId') sessionId: string) {
    return this.authService.deleteSession(sessionId);
  }
}
