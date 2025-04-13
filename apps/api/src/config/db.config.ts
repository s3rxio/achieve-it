import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";

const DB_CONFIG_KEY = "database";

const dbConfig = registerAs(
  DB_CONFIG_KEY,
  (): DatabaseConfig => ({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT || 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [User],
    migrations: ["src/migrations/*.ts"],
    synchronize: true,
    cache: {
      type: "redis",
      options: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT || 6379,
        db: 0
      }
    }
  })
);

export type DatabaseConfig = TypeOrmModuleOptions;
export default dbConfig;
