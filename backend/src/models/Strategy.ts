import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BuySignal } from "./BuySignal";
import { SellSignal } from "./SellSignal";
import { User } from "./User";
import { Trade } from "./Trade";
import { Pair } from "./Pair";
import { TimeFrame } from "./TimeFrame";

@Entity("strategies")
export class Strategy extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  user_id!: number;

  @Column({ nullable: true })
  buy_signal_id!: number | null;

  @Column({ nullable: true })
  sell_signal_id!: number | null;

  @Column()
  time_frame_id!: number;

  @Column({ nullable: true })
  pair_id!: number | null;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;

  @ManyToOne(() => BuySignal, (buySignal) => buySignal.strategy, { cascade: ['remove'] })
  @JoinColumn({ name: "buy_signal_id" })
  buySignal!: BuySignal;

  @ManyToOne(() => SellSignal, (sellSignal) => sellSignal.strategy, { cascade: ['remove'] })
  @JoinColumn({ name: "sell_signal_id" })
  sellSignal!: SellSignal;

  @ManyToOne(() => User, (user) => user.strategies)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @OneToMany(() => Trade, (trade) => trade.strategy)
  trades!: Trade[];

  @ManyToOne(() => Pair, (pair) => pair.strategies)
  @JoinColumn({ name: "pair_id" })
  pair!: Pair;

  @ManyToOne(() => TimeFrame, (timeFrame) => timeFrame.strategies)
  @JoinColumn({ name: "time_frame_id" })
  timeFrame!: TimeFrame;
}
