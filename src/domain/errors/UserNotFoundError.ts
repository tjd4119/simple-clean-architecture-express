import { DomainError } from "./DomainError";

export class UserNotFoundError extends DomainError {
  constructor(metadata: Record<string, any> = {}) {
    super(`User not found`, 404, metadata);
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}
