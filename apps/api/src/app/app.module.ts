import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AuthGuard } from "../auth/auth.guard";
import { AuthModule } from "../auth/auth.module";
import dbConfig from "../config/db.config";
import { validateEnv } from "../config/env.config";
import jwtConfig from "../config/jwt.config";
import tokenConfig from "../config/token.config";
import { UserModule } from "../user/user.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbConfig, jwtConfig, tokenConfig],
      envFilePath: [
        ".env",
        ".env.local",
        `.env.${process.env.NODE_ENV}`,
        `.env.${process.env.NODE_ENV}.local`
      ],
      validate: validateEnv
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get("database") as TypeOrmModuleOptions,
      inject: [ConfigService]
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get("jwt") as JwtModuleOptions,
      inject: [ConfigService]
    }),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    }
  ]
})
export class AppModule {}
