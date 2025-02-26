import {Entity, PrimaryGeneratedColumn, Column, OneToMany, DeleteDateColumn} from "typeorm";
import {Member} from "./Member";
import {Invitation} from "./Invitation";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Member, member => member.user)
  members: Member[];

  @OneToMany(() => Invitation, invitation => invitation.user)
  invitations: Invitation[];

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;
}
