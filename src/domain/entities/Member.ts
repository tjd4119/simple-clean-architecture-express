import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {User} from "./User";
import {Group} from "./Group";
import {JoinColumn} from "typeorm";

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Group, group => group.members)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @ManyToOne(() => User, user => user.members)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  admin: boolean;

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
