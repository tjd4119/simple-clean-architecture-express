import { HttpStatusCode } from '../types/httpTypes';
import { APIEntityError } from '../../domain/errors/APIEntityError';

/**
 * MissingFieldsInBodyError
 *
 * Request body에 required fields가 누락되어 있을 경우 응답하는 에러
 *
 * @param missingFields - String missing keys.
 *
 * Response code: `400 Bad Request`
 *
 *
 */
export class MissingFieldsInBodyError extends APIEntityError {
  constructor(missingFields: string[]) {
    super(
      HttpStatusCode.ClientErrorBadRequest,
      'Some required fields are missing in the request body.',
      {
        context: {
          missingFields: missingFields,
        },
      }
    );
  }
}
