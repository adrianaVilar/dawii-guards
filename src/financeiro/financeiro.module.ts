/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FinanceiroService } from './financeiro.service';
import { FinanceiroController } from './financeiro.controller';
import { PrismaService } from "src/prisma.service";
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [FinanceiroController],
  providers: [FinanceiroService, PrismaService, JwtService],
})
export class FinanceiroModule {}
