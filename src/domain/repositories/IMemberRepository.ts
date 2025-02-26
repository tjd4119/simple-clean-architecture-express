import {Member} from "../entities/Member";
import {EntityManager} from "typeorm";

export interface IMemberRepository {
  create(member: Member, manager?: EntityManager): Promise<Member>;
}
