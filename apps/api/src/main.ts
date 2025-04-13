import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.API_PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle("Achieve It API")
    .setDescription("The Achieve It API description")
    .addBearerAuth()
    .build();

  const swaggerPath = "docs";
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPath, app, documentFactory, {
    swaggerUrl: `${swaggerPath}/json` // FIXME: JSON don't work
  });

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
  Logger.log(
    `🚀 Swagger is running on: http://localhost:${port}/${swaggerPath}`
  );
}

bootstrap();
