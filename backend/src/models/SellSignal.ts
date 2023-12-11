import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { TechnicalResource } from "./TechnicalResource"

@Entity("sell_signals")
export class SellSignal extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string
  
  @Column()
  parameter_1!: number

  @Column()
  parameter_2!: number

  @Column()
  sell_technical_id!: number
  
  @Column()
  strategy_id!: number

  @Column()
  created_at!: Date
  
  @Column()
  updated_at!: Date

  @ManyToMany(() => TechnicalResource)
  @JoinTable({
    name: "sell_technicals",
    joinColumn: {
      name: "sell_signal_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "technical_resources_id",
      referencedColumnName: "id",
    },
  })
  sellTechnicals?: TechnicalResource[];
}
