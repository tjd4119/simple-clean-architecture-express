import {Inject, Service} from "typedi";
import {InvitationRepository} from "../../../infrastructure/repositories/InvitationRepository";
import {IInvitationRepository} from "../../repositories/IInvitationRepository";
import {Invitation, InvitationStatus} from "../../entities/Invitation";

@Service()
export class RetrievePendingInvitationsUseCase {
  constructor(
    @Inject(() => InvitationRepository) private invitationRepository: IInvitationRepository
  ) {}

  async execute(userId: string): Promise<Invitation[]> {
    return await this.invitationRepository.findAllByUserIdAndStatus(userId, InvitationStatus.PENDING);
  }
}
