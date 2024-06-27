import { IsArray, IsEmail, IsEnum, MaxLength, MinLength } from 'class-validator';
import { UserRole } from 'src/features/user/interfaces/roles.interface';

export class RegisterAuthDto {
  @IsEmail()
  email: string;

  @MinLength(3)
  @MaxLength(20)
  name: string;

  @MinLength(6)
  @MaxLength(20)
  password: string;


  @IsArray()
  @IsEnum(UserRole, { each: true })
  roles: UserRole[];
}