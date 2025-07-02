/* eslint-disable */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { RoleGuard } from "src/guards/role.guard";
import { UnauthorizedException } from "@nestjs/common";
import { hashSync } from "bcryptjs";

@UseGuards(AuthGuard, RoleGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Req() req) {
    createUserDto.roleId = Number(createUserDto.roleId);
    // Verifica o papel do usuario autenticado
    const userRole = req.user?.role;
    const ROLE_ADMIN = 2;
    const ROLE_USER = 3;

    // Se o usuario autenticado for ADMIN, ele pode criar apenas usuarios comuns
    if (userRole === ROLE_ADMIN && createUserDto.roleId !== ROLE_USER) {
      throw new UnauthorizedException("ADMINs so podem criar usuarios comuns.");
    }

    // Encriptar senha
    if (createUserDto.password) {
      createUserDto.password = hashSync(createUserDto.password, 10);
    }

    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = hashSync(updateUserDto.password, 10);
    }
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
