import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserMe } from "../user/user-me.decorator";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";
import { RefreshDto } from "./dtos/refresh.dto";
import { RegisterDto } from "./dtos/register.dto";
import { Public } from "./is-public.decorator";

@UseGuards(AuthGuard)
@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("login")
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post("register")
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @ApiBearerAuth()
  @Post("logout")
  logout(@UserMe("id") userId: number) {
    return this.authService.logout(userId);
  }

  @ApiBearerAuth()
  @Post("refresh")
  refresh(@UserMe("id") userId: number, @Body() refreshDto: RefreshDto) {
    return this.authService.refresh(userId, refreshDto.refreshToken);
  }
}
