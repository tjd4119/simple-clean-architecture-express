import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {Group} from "./Group";
import {User} from "./User";
import {JoinColumn} from "typeorm";


export const InvitationStatus = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
} as const;
export type InvitationStatus = typeof InvitationStatus[keyof typeof InvitationStatus];

@Entity()
export class Invitation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Group, group => group.invitations)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @ManyToOne(() => User, user => user.invitations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'enum', enum: InvitationStatus, default: InvitationStatus.PENDING })
  status: InvitationStatus;

  @Column({ type : 'timestamp', name: 'accepted_at', nullable: true })
  acceptedAt: Date | undefined;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'sent_at',
  })
  sentAt: Date | undefined;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
  })
  updatedAt: Date | undefined;

  public accept(): void {
    this.status = InvitationStatus.ACCEPTED;
    this.acceptedAt = new Date();
  }

  public reject(): void {
    this.status = InvitationStatus.REJECTED;
  }
}
