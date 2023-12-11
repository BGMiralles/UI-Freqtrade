import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { TechnicalResource } from "./TechnicalResource"

@Entity("buy_signals")
export class BuySignal extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string
  
  @Column()
  parameter_1!: number

  @Column()
  parameter_2!: number

  @Column()
  buy_technical_id!: number
  
  @Column()
  strategy_id!: number

  @Column()
  created_at!: Date
  
  @Column()
  updated_at!: Date

  @ManyToMany(() => TechnicalResource)
  @JoinTable({
    name: "buy_technicals",
    joinColumn: {
      name: "buy_signal_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "technical_resources_id",
      referencedColumnName: "id",
    },
  })
  buyTechnicals?: TechnicalResource[];
}
