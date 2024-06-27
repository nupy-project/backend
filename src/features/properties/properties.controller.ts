import { Controller, Get, Post, Body, Param, HttpCode, UseGuards, Request } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
// import { UpdatePropertyDto } from './dto/update-property.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard, Rol, RolesGuard } from 'src/shared';
// import { BrowserAgentGuard } from 'src/shared';

@ApiTags('properties')
@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @UseGuards(JwtGuard,RolesGuard)
  @Post('create-propertie')
  @HttpCode(201)
  @Rol(['admin'])
  create(@Body() createPropertyDto: CreatePropertyDto, @Request() req:any) {
    const user = req.user; // Obtener la información del usuario del request
    return this.propertiesService.create(createPropertyDto, user);

    // return this.propertiesService.create(createPropertyDto);
  }

  
  // @UseGuards(JwtGuard,RolesGuard)

  @Get('all-properties')
  @HttpCode(201)
  // @Rol(['admin'])
  findAll() {
    return this.propertiesService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(id);
  }


}
