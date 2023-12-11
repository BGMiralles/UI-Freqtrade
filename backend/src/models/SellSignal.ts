import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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
}
