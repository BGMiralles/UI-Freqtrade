import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { TechnicalResource } from "./TechnicalResource"
import { SellTechnical } from "./SellTechnical"
import { Strategy } from "./Strategy"

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

  @ManyToOne(() => Strategy, strategy => strategy.sellSignal)
  @JoinColumn({ name: 'strategy_id' })
  strategy!: Strategy;

  @OneToMany(() => SellTechnical, sellTechnical => sellTechnical.sellSignal)
  sellTechnicals!: SellTechnical[];
}
