export class DomainError extends Error {
  public readonly statusCode: number;
  public readonly metadata: Record<string, any>;

  constructor(message: string, statusCode: number = 400, metadata: Record<string, any> = {}) {
    super(message);
    this.statusCode = statusCode;
    this.metadata = metadata;
    Object.setPrototypeOf(this, new.target.prototype); // prototype chain 복원
  }
}
