import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsPhoneNumber, IsOptional, IsEnum, IsBoolean } from 'class-validator';

enum CommunicationMethods {
  EMAIL = 'Email',
  PHONE = 'Phone',
}

export class CreateUserDto {
  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Max Smith',
  })
  @IsString()
  @IsOptional()
  fullname?: string;

  @ApiProperty({
    description: 'Compañía del usuario',
    example: 'Keenthemes',
  })
  @IsString()
  @IsOptional()
  company?: string;

  @ApiProperty({
    description: 'Teléfono de contacto del usuario',
    example: '044 3276 454 935',
  })
  @IsPhoneNumber(null, { message: 'Debe ser un número de teléfono válido' })
  @IsOptional()
  contactPhone?: string;

  @ApiProperty({
    description: 'Sitio web de la compañía',
    example: 'keenthemes.com',
  })
  @IsString()
  @IsOptional()
  companySite?: string;

  @ApiProperty({
    description: 'País del usuario',
    example: 'Germany',
  })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({
    description: 'Métodos de comunicación preferidos',
    example: 'Email, Phone',
    enum: CommunicationMethods,
    isArray: true,
  })
  @IsEnum(CommunicationMethods, { each: true, message: 'Método de comunicación no válido' })
  @IsOptional()
  communication?: CommunicationMethods[];

  @ApiProperty({
    description: 'Permitir cambios en el perfil',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  allowChanges?: boolean;

  @ApiProperty({
    description: 'Idioma preferido del usuario',
    example: 'English',
  })
  @IsString()
  @IsOptional()
  language?: string;

  @ApiProperty({
    description: 'Zona horaria del usuario',
    example: 'GMT+1',
  })
  @IsString()
  @IsOptional()
  timeZone?: string;

  @ApiProperty({
    description: 'Moneda preferida del usuario',
    example: 'USD',
  })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiProperty({
    description: 'Permitir marketing',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  allowMarketing?: boolean;
}
