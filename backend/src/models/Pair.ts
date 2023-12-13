import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("pairs")
export class Pair extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  pair!: string

}
