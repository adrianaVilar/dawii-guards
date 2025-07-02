/* eslint-disable prettier/prettier */
 
import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdatePerfilDto {
    @IsOptional()
    @IsString()
    nome?: string;
  
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @IsOptional()
    @IsString()
    password?: string;
  
    @IsOptional()
    @IsString()
    avatarUrl?: string;
}
