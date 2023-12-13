import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("time_frames")
export class TimeFrame extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  time_frame!: string

}
