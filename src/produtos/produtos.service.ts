/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProdutosService {
  constructor(private prisma: PrismaService) {}
  
  create(createProdutoDto: CreateProdutoDto) {
    return this.prisma.produtos.create({
      data: createProdutoDto,
    });
  }

  findAll() {
    return this.prisma.produtos.findMany({
      select: {
        id: true,
        userId: true,
        imgUrl: true,
        roleId: true,
      }
    });
  }

  findOne(id: number) {
    return this.prisma.produtos.findUnique({
      where: { id: id },
      select: {
        id: true,
        userId: true,
        imgUrl: true,
        roleId: true,
      }
    });
  }

  update(id: number, updateProdutoDto: UpdateProdutoDto) {
    return this.prisma.produtos.update({
      where: { id: id },
      data: updateProdutoDto,
    });
  }

  remove(id: number) {
    return this.prisma.produtos.delete({
      where: { id: id },
    });
  }
}
