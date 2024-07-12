import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterAuthDto {
  @ApiProperty({
    description: 'Email del usuario',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty({ message: 'Email es un campo requerido' })
  email: string;

  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'John Doe',
    minLength: 3,
    maxLength: 50,
  })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'El nombre no puede exceder los 50 caracteres' })
  @IsString()
  @IsNotEmpty({ message: 'Nombre completo es un campo requerido' })
  fullname: string;

  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'Doe',
    minLength: 3,
    maxLength: 50,
  })
  @MinLength(3, { message: 'El apellido debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'El apellido no puede exceder los 50 caracteres' })
  @IsString()
  @IsNotEmpty({ message: 'Apellido es un campo requerido' })
  lastname: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'password123',
    minLength: 8,
  })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @IsString()
  @IsNotEmpty({ message: 'Contraseña es un campo requerido' })
  password: string;

  @ApiProperty({
    description: 'Indicativo del país del usuario',
    example: '+57',
  })
  @IsString()
  @IsNotEmpty({ message: 'Indicativo del país es un campo requerido' })
  countryCode: string;

  @ApiProperty({
    description: 'Teléfono del usuario',
    example: '3000116798',
  })
  @IsString()
  @IsNotEmpty({ message: 'Teléfono es un campo requerido' })
  mobile: string;

  @ApiProperty({
    description: 'Foto de perfil del usuario',
    example: 'https://example.com/profile.jpg',
  })
  @IsString()
  @IsOptional({ message: 'La foto de perfil es un campo opcional' })
  profilePicture?: string;

  @ApiProperty({
    description: 'Aceptación de términos y condiciones',
    example: true,
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty({ message: 'Aceptar términos y condiciones es un campo requerido' })
  terminos: boolean;
}
