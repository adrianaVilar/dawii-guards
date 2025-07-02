/* eslint-disable */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Acessar as informacoes do http
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const routePath = request.originalUrl.split('?')[0];
    const cleanRoute = routePath.split('/')[1];
    const baseRoute = '/' + cleanRoute;
    const ip = request.ip;
    const userAgent = request.headers['user-agent']; // Informacoes do navegador/cliente

    const module = await this.prisma.modules.findFirst({
      where: { route: baseRoute },
    });

    if (!module) {
      throw new ForbiddenException('Modulo nao encontrado.');
    }

    // Busca os dados do usuario
    const userData = await this.prisma.users.findUnique({
      where: { id: user.sub },
      include: {
        role: true,
      },
    });

    // Recebe o nome do papel do usuario
    const roleName = userData?.role?.name;

    // Verifica se ha permissao
    const permitted = await this.checkPermission(user.sub, module.id, userData?.roleId, roleName);

    // Cria log de acesso, mesmo se nao tiver permissao
    await this.prisma.accessLog.create({
      data: {
        userId: user.sub,
        ip,
        userAgent,
        route: routePath,
        permitted,
      },
    });

    // Recebe o ID enviado no parametro da requisicao em base 10
    const paramId = parseInt(request.params.id, 10);

    // Permitir se o modulo for perfil e o ID for do seu proprio perfil
    if (module.name === 'Perfil' && paramId === user?.sub) {
        return true;
    }

    if (!permitted) {
      throw new ForbiddenException(`Sem permissao para acessar o modulo "${module.name}".`);
    }

    return true;
  }

  private async checkPermission(
    userId: number,
    moduleId: number,
    roleId?: number,
    roleName?: string,
  ): Promise<boolean> {
    // Se for superusuario, tem acesso a todos os modulos
    if (roleName === 'SUPERUSER') return true;

    // Verifica se o usuario tem permissao direta no modulo
    const userPermission = await this.prisma.users_modules.findFirst({
      where: { userId, moduleId },
    });

    if (userPermission) return true;

    // Se nao for superusuario ou usuario com permissao, verifica se o papel tem permissao
    const rolePermission = await this.prisma.roles_modules.findFirst({
      where: { roleId, moduleId },
    });

    // "!!" para retornar um booleano ao inves de objeto
    return !!rolePermission;
  }
}