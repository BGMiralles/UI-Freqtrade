import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("buy_technicals")
export class BuyTechnical extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number
  
    @Column()
    buy_signal_id!: number
    
    @Column()
    technical_resources_id!: number
  }
