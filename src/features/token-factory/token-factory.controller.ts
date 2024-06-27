import { Controller, Get, Post } from '@nestjs/common';
import { TokenFactoryService } from './token-factory.service';

@Controller('token-factory')
export class TokenFactoryController {
  constructor(private readonly tokenFactoryService: TokenFactoryService) {}

  @Post('create')
  async createPropertyToken(): Promise<void> {
    return this.tokenFactoryService.createPropertyToken();
  }

  @Get('owner')
  async getOwner(): Promise<string> {
    return this.tokenFactoryService.owner();
  }
}
