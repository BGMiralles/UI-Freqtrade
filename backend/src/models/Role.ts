import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("roles")
export class Role extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  role!: string

}
