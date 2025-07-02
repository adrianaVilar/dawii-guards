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
 } from '@nestjs/common';
import { UsersModulesService } from './users-modules.service';
import { CreateUsersModuleDto } from './dto/create-users-module.dto';
import { UpdateUsersModuleDto } from './dto/update-users-module.dto';
import { AuthGuard } from "src/guards/auth.guard";
import { RoleGuard } from 'src/guards/role.guard';

@UseGuards(AuthGuard, RoleGuard)
@Controller('users-modules')
export class UsersModulesController {
  constructor(private readonly usersModulesService: UsersModulesService) {}

  @Post()
  create(@Body() createUsersModuleDto: CreateUsersModuleDto, @Req() req: any) {
    return this.usersModulesService.create(createUsersModuleDto, req.user?.sub);
  }

  @Get()
  findAll() {
    return this.usersModulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersModulesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersModuleDto: UpdateUsersModuleDto,  @Req() req: any) {
    return this.usersModulesService.update(+id, updateUsersModuleDto, req.user?.sub);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersModulesService.remove(+id);
  }
}
