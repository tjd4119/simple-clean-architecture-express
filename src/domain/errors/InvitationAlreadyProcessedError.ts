import { DomainError } from "./DomainError";

export class InvitationAlreadyProcessedError extends DomainError {
  constructor(metadata: Record<string, any> = {}) {
    super(`Invitation already processed`, 412, metadata);
    Object.setPrototypeOf(this, InvitationAlreadyProcessedError.prototype);
  }
}
