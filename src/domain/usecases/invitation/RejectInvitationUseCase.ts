import {Inject, Service} from "typedi";
import {InvitationRepository} from "../../../infrastructure/repositories/InvitationRepository";
import {IInvitationRepository} from "../../repositories/IInvitationRepository";
import {InvitationNotFoundError} from "../../errors/InvitationNotFoundError";
import {InvitationStatus} from "../../entities/Invitation";
import {InvitationAlreadyProcessedError} from "../../errors/InvitationAlreadyProcessedError";

@Service()
export class RejectInvitationUseCase {
  constructor(
    @Inject(() => InvitationRepository) private invitationRepository: IInvitationRepository
  ) {}

  async execute(invitationId: number): Promise<void> {
    const invitation = await this.invitationRepository.findById(invitationId);

    if (!invitation) {
      throw new InvitationNotFoundError({"id": invitationId});
    }

    if (invitation.status !== InvitationStatus.PENDING) {
      throw new InvitationAlreadyProcessedError({"id": invitationId});
    }

    invitation.reject();
    await this.invitationRepository.update(invitation);
  }
}
