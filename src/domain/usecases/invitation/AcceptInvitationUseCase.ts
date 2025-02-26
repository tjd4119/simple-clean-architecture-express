import {Inject, Service} from "typedi";
import {InvitationRepository} from "../../../infrastructure/repositories/InvitationRepository";
import {IInvitationRepository} from "../../repositories/IInvitationRepository";
import {InvitationNotFoundError} from "../../errors/InvitationNotFoundError";
import {InvitationStatus} from "../../entities/Invitation";
import {InvitationAlreadyProcessedError} from "../../errors/InvitationAlreadyProcessedError";
import {IMemberRepository} from "../../repositories/IMemberRepository";
import {MemberRepository} from "../../../infrastructure/repositories/MemberRepository";
import {Member} from "../../entities/Member";
import {DataSource} from "typeorm";

@Service()
export class AcceptInvitationUseCase {
  constructor(
    @Inject(() => InvitationRepository) private invitationRepository: IInvitationRepository,
    @Inject(() => MemberRepository) private memberRepository: IMemberRepository,
    @Inject("DataSource") private dataSource: DataSource
  ) {}

  async execute(invitationId: number): Promise<void> {
    const invitation = await this.invitationRepository.findById(invitationId);

    if (!invitation) {
      throw new InvitationNotFoundError({"id": invitationId});
    }

    if (invitation.status !== InvitationStatus.PENDING) {
      throw new InvitationAlreadyProcessedError({"id": invitationId});
    }

    invitation.accept();

    const newMember = new Member();
    newMember.group = invitation.group;
    newMember.user = invitation.user;
    newMember.admin = false;

    const manager = this.dataSource.manager;

    // update invitation and create member in a single transaction
    await manager.transaction(async manager => {
      await this.invitationRepository.update(invitation, manager);
      await this.memberRepository.create(newMember, manager);
    });
  }
}
