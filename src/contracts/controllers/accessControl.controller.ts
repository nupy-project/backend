import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { AccessControlService } from '../services/access-control/access-control.service';

@Controller('access-control')
export class AccessControlController {
  constructor(private readonly accessControlService: AccessControlService) {}

  @Get('admins/:address')
  async isAdmin(@Param('address') address: string): Promise<boolean> {
    return this.accessControlService.admins(address);
  }

  @Post('admins')
  async addAdmin(@Body('address') address: string): Promise<void> {
    return this.accessControlService.addAdmin(address);
  }

  @Post('remove-admin')
  async removeAdmin(@Body('address') address: string): Promise<void> {
    return this.accessControlService.removeAdmin(address);
  }
}
