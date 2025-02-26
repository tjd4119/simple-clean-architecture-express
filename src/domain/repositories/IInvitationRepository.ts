import {Invitation, InvitationStatus} from "../entities/Invitation";
import {EntityManager} from "typeorm";

export interface IInvitationRepository {
  create(invitation: Invitation): Promise<Invitation>;
  findById(id: number): Promise<Invitation|null>;
  findAllByUserIdAndStatus(userId: string, status: InvitationStatus): Promise<Invitation[]>;
  update(invitation: Invitation, manager?: EntityManager): Promise<Invitation>;
}
