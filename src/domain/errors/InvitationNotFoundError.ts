import { DomainError } from "./DomainError";

export class InvitationNotFoundError extends DomainError {
  constructor(metadata: Record<string, any> = {}) {
    super(`Invitation not found`, 404, metadata);
    Object.setPrototypeOf(this, InvitationNotFoundError.prototype);
  }
}
