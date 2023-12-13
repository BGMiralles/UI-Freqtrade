import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("pairs")
export class Role extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  pair!: string

}
