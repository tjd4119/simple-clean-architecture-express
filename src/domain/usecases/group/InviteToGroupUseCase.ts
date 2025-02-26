import {Inject, Service} from "typedi";
import {IGroupRepository} from "../../repositories/IGroupRepository";
import {GroupRepository} from "../../../infrastructure/repositories/GroupRepository";
import {InvitationRepository} from "../../../infrastructure/repositories/InvitationRepository";
import {IInvitationRepository} from "../../repositories/IInvitationRepository";
import {GroupNotFoundError} from "../../errors/GroupNotFoundError";
import {IUserRepository} from "../../repositories/IUserRepository";
import {UserRepository} from "../../../infrastructure/repositories/UserRepository";
import {UserNotFoundError} from "../../errors/UserNotFoundError";
import {Invitation, InvitationStatus} from "../../entities/Invitation";

@Service()
export class InviteToGroupUseCase {
  constructor(
    @Inject(() => GroupRepository) private groupRepository: IGroupRepository,
    @Inject(() => UserRepository) private userRepository: IUserRepository,
    @Inject(() => InvitationRepository) private invitationRepository: IInvitationRepository,
  ) {}

  async execute(groupId: number, userId: string): Promise<void> {
    const group = await this.groupRepository.findById(groupId);

    if (!group) {
      throw new GroupNotFoundError({"id": groupId});
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundError({"id": userId});
    }

    const invitation = new Invitation();
    invitation.group = group;
    invitation.user = user;
    invitation.status = InvitationStatus.PENDING;

    await this.invitationRepository.create(invitation);
  }
}
