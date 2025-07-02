/* eslint-disable prettier/prettier */
// aqui vamos mapear com o ORM (prisma) para o banco de dados
export class User {
  id: number;
  name: string;
  roleId: number; // "1: superuser", "2: admin", "3: user"
  email: string;
  password: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
