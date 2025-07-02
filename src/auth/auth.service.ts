/* eslint-disable */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async signIn(loginDto: any): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(loginDto.email);
    const { compareSync } = require("bcryptjs");

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!compareSync(loginDto.password, user?.password)) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      name: user.name,
      role: user.roleId,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
