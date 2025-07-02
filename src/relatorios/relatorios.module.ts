/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RelatoriosService } from './relatorios.service';
import { RelatoriosController } from './relatorios.controller';
import { PrismaService } from "src/prisma.service";
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [RelatoriosController],
  providers: [RelatoriosService, PrismaService, JwtService],
})
export class RelatoriosModule {}
