import { HttpStatusCode } from '../../interface/types/httpTypes';
import { APIEntityError } from './APIEntityError';

/**
 * InvalidFieldInBodyError
 *
 * Request body의 key들에 대응되는 value들이 요구되는 형식과 맞지 않음
 *
 * @param invalidKeys - String invalid keys.
 * @param details - String invalid key error messages.
 *
 * Response code: `400 Bad Request`
 *
 *
 */
export class InvalidFieldInBodyError extends APIEntityError {
  constructor(invalidFields: string[], details?: string[]) {
    super(HttpStatusCode.ClientErrorBadRequest, undefined, {
      context: {
        invalidFields: invalidFields,
        details: details,
      },
    });
  }
}
