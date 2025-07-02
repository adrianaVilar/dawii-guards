/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { PrismaService } from "src/prisma.service";
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ProdutosController],
  providers: [ProdutosService, PrismaService, JwtService],
})
export class ProdutosModule {}
