/* eslint-disable */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FinanceiroService } from './financeiro.service';
import { CreateFinanceiroDto } from './dto/create-financeiro.dto';
import { UpdateFinanceiroDto } from './dto/update-financeiro.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';

@UseGuards(AuthGuard, RoleGuard)
@Controller('financeiro')
export class FinanceiroController {
  constructor(private readonly financeiroService: FinanceiroService) {}

  @Post()
  create(@Body() createFinanceiroDto: CreateFinanceiroDto) {
    return this.financeiroService.create(createFinanceiroDto);
  }

  @Get()
  findAll() {
    return this.financeiroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.financeiroService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFinanceiroDto: UpdateFinanceiroDto) {
    return this.financeiroService.update(+id, updateFinanceiroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.financeiroService.remove(+id);
  }
}
