import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./Role";
import { Strategy } from "./Strategy";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  nickname!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  role_id!: number;

  @Column()
  is_active!: boolean;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: "role_id" })
  role!: Role;

  @OneToMany(() => Strategy, (strategy) => strategy.user)
  strategies!: Strategy[];
}
