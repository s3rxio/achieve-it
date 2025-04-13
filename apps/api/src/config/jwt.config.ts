import { registerAs } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";

const JWT_CONFIG_KEY = "jwt";

const jwtConfig = registerAs(
  JWT_CONFIG_KEY,
  (): JwtConfig => ({
    global: true,
    secret: process.env.JWT_SECRET
  })
);

export type JwtConfig = JwtModuleOptions;
export default jwtConfig;
