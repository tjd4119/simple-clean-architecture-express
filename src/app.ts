import "reflect-metadata";
import dotenvFlow from "dotenv-flow";
import express, {NextFunction, Request, Response} from "express";
import morgan from "morgan";
import logger from "./utils/logger";
import * as OpenApiValidator from "express-openapi-validator";
import path from "path";
import userRoutes from "./interface/routes/userRoutes";
import invitationRoutes from "./interface/routes/invitationRoutes";
import {DomainError} from "./domain/errors/DomainError";
import {createDataSource} from "./infrastructure/database/postgres";
import {Container} from "typedi";
import groupRoutes from "./interface/routes/groupRoutes";

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
    apiSpec: path.join(__dirname, "../apispec.yaml"),
    validateRequests: true,
    validateResponses: true,
  })
);

// setup the routes
app.use('/users', userRoutes);
app.use("/invitations", invitationRoutes);
app.use("/groups", groupRoutes);

// setup error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err);
  if (err instanceof DomainError) {
    res.status(err.statusCode).send( err.message);
    return;
  }

  res.status(err.status || 500).send(err.message);
});

// setup database source
const appDataSource = createDataSource(process.env.PG_DB_PASSWORD || 'password');
appDataSource.initialize().then(() => {
  logger.info('Database connected');
}).catch((err) => {
  logger.error('Database connection error:', err);
  process.exit(1);
});
Container.set('DataSource', appDataSource);

export default app;
