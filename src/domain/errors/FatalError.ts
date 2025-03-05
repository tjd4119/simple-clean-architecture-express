import { EntityError, IEntityErrorOptions } from './EntityError';

/**
 * Fatal Error class
 * Convenience error class to sink all unexpected exceptions.
 *
 * @param cause - Cause of fatal error.
 * @param options - Options to contain specific error context.
 *
 * @remarks
 * DO NOT over use fatal error.
 * Once you can expect error situation in logic,
 * handle the error with appropriate error class instead of fatal error class.
 *
 */
export class FatalError extends EntityError {
  constructor(public readonly cause: unknown, options?: IEntityErrorOptions) {
    super(cause instanceof Error ? cause.message : 'Unknown error', {
      context: options?.context,
    });
  }
}
