/**
 * Entity error options
 *
 * @param cause - Cause of error.
 * @param context - Context of error. Should be jsonable.
 *
 */
export interface IEntityErrorOptions {
  cause?: Error;
  context?: Jsonable;
}

type ErrorCause = undefined | Error | unknown;

/**
 * Error foundation class
 *
 * @param message - Error message.
 * @param options - Options to contain specific error cause and context.
 *
 */
export class EntityError extends Error {
  public readonly context?: Jsonable;
  cause: ErrorCause;

  constructor(message?: string, options?: IEntityErrorOptions) {
    super(message);
    this.name = this.constructor.name;
    this.cause = options?.cause;
    this.context = options?.context;
  }
}
