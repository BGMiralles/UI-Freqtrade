import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Strategy } from "./Strategy";

@Entity("time_frames")
export class TimeFrame extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  time_frame!: string

  @OneToMany(() => Strategy, strategy => strategy.timeFrame)
  strategies!: Strategy[];
}
