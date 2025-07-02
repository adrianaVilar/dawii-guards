/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PerfilService } from './perfil.service';
import { PerfilController } from './perfil.controller';
import { PrismaService } from "src/prisma.service";
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [PerfilController],
  providers: [PerfilService, PrismaService, JwtService],
})
export class PerfilModule {}
