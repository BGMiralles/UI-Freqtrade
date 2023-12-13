import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("time_frames")
export class Role extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  time_frame!: string

}
