declare global {
  namespace NodeJS {
    type ProcessEnv = import("./config/env.config").EnvironmentVariables;
  }

  namespace Express {
    interface Request {
      user: import("./user/entities/user.entity").UserEntity;
    }
  }
}

export {};
