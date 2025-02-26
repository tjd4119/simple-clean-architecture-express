import {Group} from "../entities/Group";

export interface IGroupRepository {
  create(group: Group): Promise<Group>;
  findById(id: number): Promise<Group | null>;
}
