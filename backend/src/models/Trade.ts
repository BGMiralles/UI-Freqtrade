import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Strategy } from "./Strategy";

@Entity("trades")
export class Trade extends BaseEntity{
    @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'decimal', precision: 10})
  PNL!: string;

  @Column()
  status!: string;

  @Column({ type: 'decimal', precision: 10})
  entry_price!: number;

  @Column({ type: 'decimal', precision: 10})
  amount!: number;

  @Column()
  strategy_id!: number;

  @Column()
  created_at!: Date
  
  @Column()
  updated_at!: Date

  @ManyToOne(() => Strategy, (strategy) => strategy.trades)
  @JoinColumn({ name: 'strategy_id' })
  strategy!: Strategy;
}
