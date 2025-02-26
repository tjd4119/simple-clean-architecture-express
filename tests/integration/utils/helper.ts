import {Member} from "../../../src/domain/entities/Member";
import datasource from "../../../scripts/local.datasource";
import {Invitation} from "../../../src/domain/entities/Invitation";

export async function getGroupMembers(groupId: number): Promise<Member[]> {
  if (!datasource.isInitialized) await datasource.initialize();
  const memberRepository = datasource.getRepository(Member);
  return memberRepository.find({
    where: {
      group: { id: groupId },
    },
    relations: ["user", "group"],
  });
}

export async function getInvitation(id: number): Promise<Invitation|null> {
  if (!datasource.isInitialized) await datasource.initialize();
  const invitationRepository = datasource.getRepository(Invitation);
  return (await invitationRepository.findOne({
    where: { id },
  })) || null;
}

export async function getUserInvitations(userId: string): Promise<Invitation[]> {
  if (!datasource.isInitialized) await datasource.initialize();
  const invitationRepository = datasource.getRepository(Invitation);
  return invitationRepository.find({
    where: {
      user: { id: userId },
    },
    relations: ["group", "user"],
  });
}
