import datasource from "../../../scripts/local.datasource";
import {User} from "../../../src/domain/entities/User";
import {Group} from "../../../src/domain/entities/Group";
import {Invitation, InvitationStatus} from "../../../src/domain/entities/Invitation";

export async function insertUsers(num: number = 5) {
  if (!datasource.isInitialized) await datasource.initialize();
    const userRepo = datasource.getRepository(User);
    for (let i = 0; i < num; i++) {
      const user = new User();
      user.name = `user${i}`;
      user.email = `test${i}@test.com`;
      await userRepo.save(user);
    }
}

export async function insertUser(id: string, name: string, email: string) {
  if (!datasource.isInitialized) await datasource.initialize();
    const userRepo = datasource.getRepository(User);
    const user = new User();
    user.id = id;
    user.name = name;
    user.email = email;
    await userRepo.save(user);
}

export async function insertGroup(id: number, name: string, description: string) {
  if (!datasource.isInitialized) await datasource.initialize();
    const groupRepo = datasource.getRepository(Group);
    const group = new Group();
    group.id = id;
    group.name = name;
    group.description = description;
    await groupRepo.save(group);
}

export async function insertInvitation(id: number, status: InvitationStatus, userId: string, groupId: number) {
  if (!datasource.isInitialized) await datasource.initialize();
    const invitationRepo = datasource.getRepository(Invitation);
    const invitation = {
      id,
      user: { id: userId },
      group: { id: groupId },
      status: status,
    };
    await invitationRepo.save(invitation);
}
