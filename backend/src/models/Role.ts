import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity("roles")
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  role!: string;

  @OneToMany(() => User, (user) => user.role)
  users!: User[];
}
