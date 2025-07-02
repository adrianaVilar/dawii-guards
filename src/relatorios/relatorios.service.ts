/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
 
import { Injectable } from '@nestjs/common';
import { CreateRelatorioDto } from './dto/create-relatorio.dto';
import { UpdateRelatorioDto } from './dto/update-relatorio.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RelatoriosService {
  constructor(private prisma: PrismaService) {}
  
  create(createRelatorioDto: CreateRelatorioDto) {
    return this.prisma.relatorios.create({
      data: createRelatorioDto,
    });
  }

  findAll() {
    return this.prisma.relatorios.findMany({
      select: {
        id: true,
        userId: true,
        text: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.relatorios.findUnique({
      where: { id: id },
      select: {
        id: true,
        userId: true,
        text: true,
      },
    });
  }

  update(id: number, updateRelatorioDto: UpdateRelatorioDto) {
    return this.prisma.relatorios.update({
      where: { id: id },
      data: updateRelatorioDto,
    });
  }

  remove(id: number) {
    return this.prisma.relatorios.delete({
      where: { id: id },
    });
  }
}
