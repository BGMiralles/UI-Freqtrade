import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity("technical_resources")
export class TechnicalResource extends BaseEntity{
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

  @ManyToMany(() => TechnicalResource)
  @JoinTable({
    name: "sell_technicals",
    joinColumn: {
      name: "technical_resources_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "sell_signal_id",
      referencedColumnName: "id",
    },
  })
  sellTechnicals?: TechnicalResource[];
}
