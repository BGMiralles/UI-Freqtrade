import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("trades")
export class Strategy extends BaseEntity{
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

}
