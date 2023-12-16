import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BuyTechnical } from "./BuyTechnical";
import { Strategy } from "./Strategy";

@Entity("buy_signals")
export class BuySignal extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  parameter_1!: number;

  @Column()
  parameter_2!: number;

  @Column({ nullable: true})
  buy_technical_id!: number;

  @Column()
  strategy_id!: number;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;

  @ManyToOne(() => Strategy, (strategy) => strategy.buySignal)
  @JoinColumn({ name: "strategy_id" })
  strategy!: Strategy;

  @OneToMany(() => BuyTechnical, (buyTechnical) => buyTechnical.buySignal)
  buyTechnicals!: BuyTechnical[];
}
