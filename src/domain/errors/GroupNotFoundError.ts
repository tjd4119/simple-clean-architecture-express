import { DomainError } from "./DomainError";

export class GroupNotFoundError extends DomainError {
  constructor(metadata: Record<string, any> = {}) {
    super(`Group not found`, 404, metadata);
    Object.setPrototypeOf(this, GroupNotFoundError.prototype);
  }
}
