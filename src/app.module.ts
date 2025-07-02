/* eslint-disable */
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { PerfilModule } from './perfil/perfil.module';
import { FinanceiroModule } from './financeiro/financeiro.module';
import { RelatoriosModule } from './relatorios/relatorios.module';
import { ProdutosModule } from './produtos/produtos.module';
import { RoleGuard } from "./guards/role.guard";
import { PrismaService } from "./prisma.service";
import { UsersModulesModule } from './users-modules/users-modules.module';
import { join } from "path";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src', 'view'),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    UsersModule, AuthModule, PerfilModule, FinanceiroModule, RelatoriosModule, ProdutosModule, UsersModulesModule],
  controllers: [AppController],
  providers: [AppService, RoleGuard, PrismaService],
})
export class AppModule {}
