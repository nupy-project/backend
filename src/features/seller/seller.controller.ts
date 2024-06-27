import { Body, Controller, HttpCode, Put, UseGuards, Req, Post,Request, Get, Param } from '@nestjs/common';
import { SellerService } from './seller.service';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard, Rol, RolesGuard } from 'src/shared';
import { Request as ExpressRequest } from 'express'; // Renombramos la importación aquí
import { CreatePropertyDto } from '../token-factory/dto/create-property.dto';

@UseGuards(JwtGuard, RolesGuard)
@Rol(['seller'])
@ApiTags('seller')
@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @HttpCode(201)
  @Put('update')
  async updateSeller(
    @Req() req: ExpressRequest, // Usamos `ExpressRequest` para evitar conflictos
    @Body() updateSellerDto: UpdateSellerDto,
  ) {
    const userId = req.user._id; // Obtenemos el ID del usuario del token
    console.log('userId que hace la peticion',userId)

    return this.sellerService.updateSeller(userId, updateSellerDto);
  }

  @Post('create-propertie')
  @HttpCode(201)
  create(@Body() createPropertyDto: CreatePropertyDto,  @Request() req:any) {
    const userId = req.user._id; // Obtenemos el ID del usuario del token
    // console.log('userId que hace la peticion',userId)
    return this.sellerService.create(createPropertyDto, userId);

  }

  @Put('update-propertie/:id')
  @HttpCode(200)
  updateProperty(
    @Req() req: ExpressRequest, // Usamos `ExpressRequest` para evitar conflictos
    @Body() updatePropertyDto: any,
    @Param('id') id: string,
  ) {
    return this.sellerService.updateProperty(id, updatePropertyDto);
  }

  
  @Get('all-properties')
  @HttpCode(201)
  findAll() {
    return this.sellerService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.sellerService.findOne(id);
  }
  @Put('publish-propertie/:id')
  @HttpCode(200)
  publishProperty(@Param('id') id: string, @Req() req: ExpressRequest) {
    const userId = req.user._id; // Obtenemos el ID del usuario del token
    return this.sellerService.publishProperty(id, userId);
  }


}
