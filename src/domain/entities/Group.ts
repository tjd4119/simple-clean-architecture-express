import {Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {Member} from "./Member";
import {Invitation} from "./Invitation";

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Member, member => member.group)
  members: Member[];

  @OneToMany(() => Invitation, invitation => invitation.group)
  invitations: Invitation[];

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt: Date | undefined;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
  })
  updatedAt: Date | undefined;
}
