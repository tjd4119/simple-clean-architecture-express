import {Inject, Service} from "typedi";
import {IGroupRepository} from "../../repositories/IGroupRepository";
import {GroupRepository} from "../../../infrastructure/repositories/GroupRepository";
import {Group} from "../../entities/Group";

@Service()
export class CreateGroupUseCase {
  constructor(
    @Inject(() => GroupRepository) private groupRepository: IGroupRepository
  ) {}

  async execute(name: string, description: string): Promise<Group> {
    const newGroup = new Group();
    newGroup.name = name;
    newGroup.description = description;

    return await this.groupRepository.create(newGroup);
  }
}
