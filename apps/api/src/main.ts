import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.API_PORT || 3000;
  const host = process.env.API_HOST || "localhost";
  const url = process.env.API_URL || `http://${host}:${port}`;

  const config = new DocumentBuilder()
    .setTitle("Achieve It API")
    .setDescription("The Achieve It API description")
    .addBearerAuth()
    .build();

  const swaggerPath = "docs";
  const swaggerJsonPath = `${swaggerPath}/json`;
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPath, app, documentFactory, {
    jsonDocumentUrl: swaggerJsonPath
  });

  app.enableCors("*");

  await app.listen(port, host);
  Logger.log(`🚀 Application is running on: ${url}`);
  Logger.log(`📚 Swagger is running on: ${url}/${swaggerPath}`);
  Logger.log(`📃 OpenAPI specification path: ${url}/${swaggerJsonPath}`);
}

bootstrap();
