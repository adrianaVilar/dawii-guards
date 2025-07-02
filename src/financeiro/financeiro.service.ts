/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { CreateFinanceiroDto } from './dto/create-financeiro.dto';
import { UpdateFinanceiroDto } from './dto/update-financeiro.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FinanceiroService {
  constructor(private prisma: PrismaService) {}
  
  create(createFinanceiroDto: CreateFinanceiroDto) {
    return this.prisma.financeiro.create({
      data: createFinanceiroDto,
    });
  }

  findAll() {
    return this.prisma.financeiro.findMany({
      select: {
        id: true,
        userId: true,
        entry: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.financeiro.findUnique({
      where: { id: id },
      select: {
        id: true,
        userId: true,
        entry: true,
      },
    });
  }

  update(id: number, updateFinanceiroDto: UpdateFinanceiroDto) {
    return this.prisma.financeiro.update({
      where: { id: id },
      data: updateFinanceiroDto,
    });
  }

  remove(id: number) {
    return this.prisma.financeiro.delete({
      where: { id: id },
    });
  }
}
