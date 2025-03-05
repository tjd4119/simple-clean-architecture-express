import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from '../../domain/apiSpecifications/httpTypes';
import { FatalError } from '../../domain/errors/FatalError';
import Container from 'typedi';
import { ScanServerStatusUseCase } from '../../domain/usecases/status/ScanServerStatusUseCase';
import { GetCurrentUTCDateTimeUseCase } from '../../domain/usecases/status/GetCurrentUTCDateTimeUseCase';

/**
 * [API operation handler]
 *
 * operationId: healthCheck
 *
 * @remarks
 * The function name should be the same with operationId
 * defined in openAPI specification.
 *
 * `express-openapi-validator` middleware automatically route to the matched operationId
 *
 * @see {@link https://app.apidog.com/link/project/771582/apis/api-12797156}
 *
 */
export const healthCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const useCase = Container.get(ScanServerStatusUseCase);
    const status = await useCase.execute();
    res.status(HttpStatusCode.SuccessOK).json(status);
  } catch (e) {
    next(new FatalError(e));
  }
};

/**
 * [API operation handler]
 *
 * operationId: ping
 *
 * @remarks
 * The function name should be the same with operationId
 * defined in openAPI specification.
 *
 * `express-openapi-validator` middleware automatically route to the matched operationId
 *
 * @see {@link https://app.apidog.com/link/project/771582/apis/api-12796860}
 *
 */
export const ping = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const useCase = Container.get(GetCurrentUTCDateTimeUseCase);
    const currentTime = await useCase.execute();

    res.status(HttpStatusCode.SuccessOK).json({ time: currentTime });
  } catch (e) {
    next(new FatalError(e));
  }
};

/**
 * [API operation handler]
 *
 * operationId: backOfficeOnly
 *
 * @remarks
 * The function name should be the same with operationId
 * defined in openAPI specification.
 *
 * `express-openapi-validator` middleware automatically route to the matched operationId
 *
 * @see {@link https://app.apidog.com/project/771582/apis/api-12796860}
 *
 */
export const backOfficeOnly = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(HttpStatusCode.SuccessOK).json({});
  } catch (e) {
    next(new FatalError(e));
  }
};

/**
 * [API operation handler]
 *
 * operationId: internalOnly
 *
 * @remarks
 * The function name should be the same with operationId
 * defined in openAPI specification.
 *
 * `express-openapi-validator` middleware automatically route to the matched operationId
 *
 * @see {@link https://app.apidog.com/project/771582/apis/api-12796860}
 *
 */
export const internalOnly = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(HttpStatusCode.SuccessOK).json({});
  } catch (e) {
    next(new FatalError(e));
  }
};

/**
 * [API operation handler]
 *
 * operationId: publicOnly
 *
 * @remarks
 * The function name should be the same with operationId
 * defined in openAPI specification.
 *
 * `express-openapi-validator` middleware automatically route to the matched operationId
 *
 * @see {@link https://app.apidog.com/link/project/771582/apis/api-13955127}
 *
 */
export const publicOnly = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(HttpStatusCode.SuccessOK).json({});
  } catch (e) {
    next(new FatalError(e));
  }
};
