import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("sell_technicals")
export class SellTechnical extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  sell_signal_id!: number
  
  @Column()
  technical_resources_id!: number
}
