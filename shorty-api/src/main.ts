import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import {
  useSwaggerMiddleware,
  createSwaggerDocumentFactory,
} from './libs/swagger.lib';
import { HtmlNotFoundExceptionFilter } from './filters/404.filter';

async function bootstrap() {
  // App init
  const app = await NestFactory.create(AppModule);

  // Swagger API hookup
  if (process.env.SWAGGER_ENABLED === 'true') {
    useSwaggerMiddleware(app);
    const documentFactory = createSwaggerDocumentFactory(app);
    SwaggerModule.setup('api', app, documentFactory);
  }

  // Redirecting 404 to the website
  app.useGlobalFilters(new HtmlNotFoundExceptionFilter());
  // Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true, // payloads -> DTO
    }),
  );

  // CORS
  app.enableCors();

  console.log('Hello port', process.env.PORT ?? 3000);
  // Listen
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
