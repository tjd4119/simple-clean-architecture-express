import 'reflect-metadata';
import dotenvFlow from 'dotenv-flow';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import logger from './utils/logger';
import * as OpenApiValidator from 'express-openapi-validator';
import { createDataSource } from './infrastructure/database/postgres';
import { Container } from 'typedi';
import { apiOperationHandlerRootPath } from './interface/controllers/api.operation.handler.root.path';
import { apiSpecification } from './domain/apiSpecifications/apiSpecification';
import { getDatabasePassword } from './infrastructure/aws/secretManager';
import { APIEntityError } from './domain/errors/APIEntityError';
import { HttpStatusCode } from './domain/apiSpecifications/httpTypes';

dotenvFlow.config();

const app = express();
app.use(express.json());

// setup the logger middleware
const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  {
    stream: {
      // Configure Morgan to use our custom logger with the http severity
      write: (message) => logger.http(message.trim()),
    },
  }
);
app.use(morganMiddleware);

// setup the OpenAPIValidator middleware
app.use(
  OpenApiValidator.middleware({
    apiSpec: apiSpecification,
    validateRequests: true,
    validateResponses: false,
    operationHandlers: apiOperationHandlerRootPath,
    validateSecurity: false,
  })
);

// setup error handler
app.use((e: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(e);
  if (e instanceof APIEntityError) {
    res.status(e.httpStatusCode).json({
      context: e.context,
    });
  }

  res.status(e.status ?? HttpStatusCode.ServerErrorInternal).json({
    message: e.type ?? 'The server encountered an unexpected condition',
  });
});

async function DatabaseConnect() {
  const password = await getDatabasePassword();
  logger.info('Database password retrieved : ' + password);
  // setup database source
  const appDataSource = createDataSource(password);
  await appDataSource
    .initialize()
    .then(() => {
      logger.info('Database connected');
    })
    .catch((err) => {
      logger.error('Database connection error:', err);
      process.exit(1);
    });
  Container.set('DataSource', appDataSource);
}

DatabaseConnect();

export default app;
