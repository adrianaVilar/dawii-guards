/* eslint-disable */
import { PrismaClient } from '../generated/prisma';
import { hashSync } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {

    // Cria os papeis (roles)
    try {
        await prisma.roles.createMany({
          data: [
            { name: 'SUPERUSER' },
            { name: 'ADMIN' },
            { name: 'USER' },
          ],
        });
    } catch (e) {
        console.log('Nao foi possivel inserir roles:', e);
    }

    // Cria as rotas dos modulos
    try {
        await prisma.modules.createMany({
        data: [
            { name: 'Users', route: '/users' },
            { name: 'Perfil', route: '/perfil' },
            { name: 'Financeiro', route: '/financeiro' },
            { name: 'Relatorios', route: '/relatorios' },
            { name: 'Produtos', route: '/produtos' },
            { name: 'Modules', route: '/modules' },
            { name: 'User-modules', route: '/users-modules' },
        ],
        });
    } catch (e) {
        console.log('Nao foi possivel inserir modules:', e);
    }

    // Busca o IDs dos roles
    const superuserRole = await prisma.roles.findUnique({
        where: { name: 'SUPERUSER' },
    });
    const adminRole = await prisma.roles.findUnique({
        where: { name: 'ADMIN' },
    });

    // Busca o IDs dos modulos
    const usuario = await prisma.modules.findUnique({
        where: { name: 'Users' },
    });
    const financeiro = await prisma.modules.findUnique({
        where: { name: 'Financeiro' },
    });
    const relatorios = await prisma.modules.findUnique({
        where: { name: 'Relatorios' },
    });
    const produtos = await prisma.modules.findUnique({
        where: { name: 'Produtos' },
    });
    const modules = await prisma.modules.findUnique({
        where: { name: 'Modules' },
    });
    const userModules = await prisma.modules.findUnique({
        where: { name: 'User-modules' },
    });
  
    // Cria um superusuario
    await prisma.users.upsert({
    where: { email: 'super@user.com' },
    update: {},
    create: {
        name: 'Primeiro usuario',
        email: 'super@user.com',
        password: hashSync('1234', 10),
        roleId: superuserRole?.id, // ID do superusuário
    },
    });

    // Popula roles_modules
    // Superusuarios e admins tem acesso a todos os modulos exceto o de perfil
    if (!superuserRole || !adminRole || !usuario || !financeiro || !relatorios || !produtos || !modules || !userModules ) {
        throw new Error('Papel ou modulo nao encontrado no banco de dados');
    }

    await prisma.roles_modules.createMany({
    data: [
        { roleId: superuserRole?.id, moduleId: usuario?.id },
        { roleId: superuserRole?.id, moduleId: financeiro?.id },
        { roleId: superuserRole?.id, moduleId: relatorios?.id },
        { roleId: superuserRole?.id, moduleId: produtos?.id },
        { roleId: superuserRole?.id, moduleId: modules?.id },
        { roleId: superuserRole?.id, moduleId: userModules?.id },
        { roleId: adminRole?.id, moduleId: usuario?.id },
        { roleId: adminRole?.id, moduleId: financeiro?.id },
        { roleId: adminRole?.id, moduleId: relatorios?.id },
        { roleId: adminRole?.id, moduleId: produtos?.id },
        { roleId: adminRole?.id, moduleId: modules?.id },
        { roleId: adminRole?.id, moduleId: userModules?.id },
    ],
    });

}

// Insere os dados, imprime se houver erro e finaliza a conexao com o db
main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
