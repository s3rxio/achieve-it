import { plainToInstance } from "class-transformer";
import {
  IsEnum,
  IsNumber,
  IsString,
  Max,
  Min,
  validateSync
} from "class-validator";

enum NodeEnv {
  Development = "development",
  Production = "production"
}

export class EnvironmentVariables {
  @IsEnum(NodeEnv)
  NODE_ENV!: NodeEnv;

  @IsString()
  API_HOST!: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  API_PORT!: number;

  @IsString()
  API_URL!: string;

  @IsString()
  POSTGRES_HOST!: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  POSTGRES_PORT!: number;

  @IsString()
  POSTGRES_USER!: string;

  @IsString()
  POSTGRES_PASSWORD!: string;

  @IsString()
  POSTGRES_DB!: string;

  @IsString()
  JWT_SECRET!: string;

  @IsString()
  REDIS_HOST!: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  REDIS_PORT!: number;
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
