import { registerAs } from "@nestjs/config";

/* Думаю лучше названать как auth config, а не token. Что считаете? */
const TOKEN_CONFIG_KEY = "token";

const tokenConfig = registerAs(
  TOKEN_CONFIG_KEY,
  (): TokenConfig => ({
    access: {
      expiresIn: process.env.TOKEN_ACCESS_LIFETIME
    },
    refresh: {
      expiresIn: process.env.TOKEN_REFRESH_LIFETIME
    }
  })
);

export enum Token {
  Access = "access",
  Refresh = "refresh"
}
export type TokenConfig = Record<
  Token,
  {
    secret?: string;
    expiresIn: string;
  }
>;
export default tokenConfig;
