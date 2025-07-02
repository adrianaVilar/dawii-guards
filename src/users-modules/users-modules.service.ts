/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { CreateUsersModuleDto } from './dto/create-users-module.dto';
import { UpdateUsersModuleDto } from './dto/update-users-module.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersModulesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUsersModuleDto: CreateUsersModuleDto, providedByUserId: number) {

    return this.prisma.users_modules.create({
      data: {
        userId: createUsersModuleDto.userId,
        moduleId: createUsersModuleDto.moduleId,
        providedBy: providedByUserId,
      },
    });
  }

  findAll() {
    return this.prisma.usersModules.findMany({
      select: { 
        id: true,
        userId: true,
        moduleId: true,
        providedBy: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.usersModules.findUnique({
      where: { id: id },
      select: {
        id: true,
        userId: true,
        moduleId: true,
        providedBy: true,
        providedAt: true,
      },
    });
  }

  update(id: number, updateUsersModuleDto: UpdateUsersModuleDto, providedByUserId: number) {
    return this.prisma.usersModules.update({
      where: { id: id },
      data: {
        userId: updateUsersModuleDto.userId,
        moduleId: updateUsersModuleDto.moduleId,
        providedBy: providedByUserId,
      },
    });
  }

  remove(id: number) {
    return this.prisma.usersModules.delete({
      where: { id: id },
    });
  }
}
