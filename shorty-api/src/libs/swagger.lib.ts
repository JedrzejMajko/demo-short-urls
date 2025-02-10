import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import * as expressBasicAuth from 'express-basic-auth';
import { RequestHandler } from 'express';

export const createSwaggerDocumentFactory = (
  app: INestApplication,
): (() => OpenAPIObject) => {
  return () => SwaggerModule.createDocument(app, createSwaggerConfig());
};
export const createSwaggerConfig = (): Omit<OpenAPIObject, 'paths'> => {
  return new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE || 'Title')
    .setDescription(process.env.SWAGGER_DESCRIPTION || 'Description')
    .setVersion(process.env.SWAGGER_API_VERSION || 'Api version')
    .build();
};

export const getSwaggerPaths = (): string[] => {
  return ['/api', '/api-json'];
};

/**
 * @Throws Error  SWAGGER_BASIC_USER or SWAGGER_BASIC_PASS are undefined
 */
export const createSwaggerBaseAuthMiddleware = (): RequestHandler => {
  if (
    typeof process.env.SWAGGER_BASIC_USER !== 'string' ||
    typeof process.env.SWAGGER_BASIC_PASS !== 'string'
  ) {
    throw new Error('Missing SWAGGER_BASIC_USER or SWAGGER_BASIC_PASS in .env');
  }
  return expressBasicAuth({
    challenge: true,
    users: {
      [process.env.SWAGGER_BASIC_USER]: process.env.SWAGGER_BASIC_PASS,
    },
  });
};

export const useSwaggerMiddleware = (app: INestApplication) => {
  const auth: RequestHandler = createSwaggerBaseAuthMiddleware();
  // potential checks if auth can return false/null.

  app.use(getSwaggerPaths(), auth);
};
