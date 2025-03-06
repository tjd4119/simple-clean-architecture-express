import { HttpStatusCode } from '../../interface/types/httpTypes';
import { EntityError, IEntityErrorOptions } from './EntityError';

/**
 * Foundation of API error class in entity layer
 * All specific API entity errors MUST inherit this error class.
 *
 * @param httpStatusCode - HTTP status code of API error.
 * @param message - API specific error message.
 * @param options - Options to contain specific error context.
 *
 */
export class APIEntityError extends EntityError {
  constructor(
    public readonly httpStatusCode: HttpStatusCode,
    message?: string,
    options?: IEntityErrorOptions
  ) {
    super(message, options);
  }
}
