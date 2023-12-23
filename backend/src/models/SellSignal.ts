import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { SellTechnical } from "./SellTechnical";
import { Strategy } from "./Strategy";

@Entity("sell_signals")
export class SellSignal extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  parameter_1!: number;

  @Column()
  parameter_2!: number;

  @Column({ nullable: true, type: "int"})
  sell_technical_id!: number | null;

  @Column({ nullable: true, type: "int"})
  strategy_id!: number | null;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;

  @ManyToOne(() => Strategy, (strategy) => strategy.sellSignal)
  @JoinColumn({ name: "strategy_id" })
  strategy!: Strategy;

  @OneToMany(() => SellTechnical, (sellTechnical) => sellTechnical.sellSignal, { cascade: ['remove'] })
  sellTechnicals!: SellTechnical[];
}
