## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
npm install
```

## Interpret and run TypeScript

```bash
npm install -D ts-node
```

## Install seeds

```bash
npx prisma db seed
```

## Compile and run the project

```bash
npm run start:dev
```

## Check tables in DB

```bash
npx prisma studio
```

---
## Login
POST localhost:3000/auth
```bash
{
  "email": "super@user.com",
  "password": "1234"
}
```

## Get users
Login as superuser or admin  
GET localhost:3000/users

## Create users
Login as superuser or admin  
POST localhost:3000/users
```bash
{
    "email": "user@financeiro.com",
    "password": "1234",
    "name": "Usuario com acesso ao financeiro",
    "roleId": 3
}
```

## Update users-modules
Login as superuser or admin  
POST localhost:3000/users-modules
```bash
{
    "userId": 4,
    "moduleId": 3
}
```

## Access financeiro
Login as superuser, admin or user with permission 
GET localhost:3000/financeiro

## Access relatorios
Login as superuser, admin or user with permission 
GET localhost:3000/relatorios

## Access produtos
Login as superuser, admin or user with permission 
GET localhost:3000/produtos

## Access perfis
Login as superuser, admin or user with permission 
GET localhost:3000/perfil

## Access perfis by id
Login as superuser, admin or user with permission 
GET localhost:3000/perfil/id

## Access Logs
http://localhost:5555/
