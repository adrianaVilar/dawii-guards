/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PerfilService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.users.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  update(id: number, updatePerfilDto: UpdatePerfilDto) {
    return this.prisma.users.update({
      where: { id: id }, 
      data: updatePerfilDto,
      select: {
        id: true,
        name: true,
        email: true,
        roleId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.users.delete({
      where: { id: id },
    });
  }
}
