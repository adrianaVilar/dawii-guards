/* eslint-disable */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Acessar as informacoes do http
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException('Usuario nao autenticado');
    }
    
    try {
      // Validar token jwt
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'hard!to-guess_secret',
      });
    
      request["user"] = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token invalido');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
