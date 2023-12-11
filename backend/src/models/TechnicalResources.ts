import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("technical_resources")
export class TechnicalResources extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  description!: string
    
  @Column()
  created_at!: Date
  
  @Column()
  updated_at!: Date
}
