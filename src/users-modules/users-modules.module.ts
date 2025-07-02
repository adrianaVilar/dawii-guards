/* eslint-disable */
import { Module } from '@nestjs/common';
import { UsersModulesService } from './users-modules.service';
import { UsersModulesController } from './users-modules.controller';
import { PrismaService } from '../prisma.service';
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [UsersModulesController],
  providers: [JwtService, UsersModulesService, PrismaService],
})
export class UsersModulesModule {}
