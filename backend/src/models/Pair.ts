import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Strategy } from "./Strategy";

@Entity("pairs")
export class Pair extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  pair!: string

  @OneToMany(() => Strategy, strategy => strategy.pair)
  strategies!: Strategy[];
}
