import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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
}
