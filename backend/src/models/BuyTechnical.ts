import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { BuySignal } from "./BuySignal";
import { TechnicalResource } from "./TechnicalResource";
import { Strategy } from "./Strategy";

@Entity("buy_technicals")
export class BuyTechnical extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number
  
    @Column()
    buy_signal_id!: number
    
    @Column()
    technical_resources_id!: number

    @ManyToOne(() => BuySignal, buySignal => buySignal.buyTechnicals)
    @JoinColumn({ name: 'buy_signal_id' })
    buySignal!: BuySignal;
  
    @ManyToOne(() => TechnicalResource, technicalResource => technicalResource.buyTechnicals)
    @JoinColumn({ name: 'technical_resources_id' })
    technicalResource!: TechnicalResource;
  }
