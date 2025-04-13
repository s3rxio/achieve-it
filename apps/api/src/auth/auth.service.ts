import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { UserService } from "../user/user.service";
import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";

export type JwtPayload = {
  sub: number;
};

export enum TokenType {
  Access = "access",
  Refresh = "refresh"
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async login(dto: LoginDto) {
    const user = await this.userService
      .findOne({
        username: dto.username
      })
      .catch(() => {
        throw new BadRequestException("Invalid credentials");
      });

    if (!bcrypt.compareSync(dto.password, user.password)) {
      throw new BadRequestException("Invalid credentials");
    }

    const tokens = await this.createTokens(user.id);
    return tokens;
  }

  async register(dto: RegisterDto) {
    const user = await this.userService.create(dto);

    const tokens = await this.createTokens(user.id);
    return tokens;
  }

  async logout(userId: number) {
    const user = await this.userService.findOne({
      id: userId
    });

    await this.userService.update(user.id, {
      refreshToken: null
    });

    return {
      message: "Logout successful"
    };
  }

  async refresh(userId: number, refreshToken: string) {
    const user = await this.userService.findOne({
      id: userId
    });

    if (
      !user.refreshToken ||
      !bcrypt.compareSync(refreshToken, user.refreshToken)
    ) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    return {
      accessToken: await this.signToken(userId, TokenType.Access)
    };
  }

  async createTokens(userId: number) {
    const refreshToken = await this.createRefreshToken(userId);
    const { accessToken } = await this.refresh(userId, refreshToken);

    return {
      accessToken,
      refreshToken
    };
  }

  async createRefreshToken(userId: number) {
    const refreshToken = await this.signToken(userId, TokenType.Refresh);
    await this.userService.update(userId, {
      refreshToken: bcrypt.hashSync(refreshToken, 10)
    });
    return refreshToken;
  }

  signToken(userId: number, type: TokenType) {
    const payload: JwtPayload = {
      sub: userId
    };

    return this.jwtService.signAsync(payload, {
      expiresIn: type === TokenType.Access ? "1h" : "14d",
      secret: this.configService.get("jwt.secret")
    });
  }
}
