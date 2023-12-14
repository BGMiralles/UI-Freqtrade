import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TechnicalResource } from "./TechnicalResource";
import { SellSignal } from "./SellSignal";
import { Strategy } from "./Strategy";

@Entity("sell_technicals")
export class SellTechnical extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  sell_signal_id!: number;

  @Column()
  technical_resources_id!: number;

  @ManyToOne(() => SellSignal, sellSignal => sellSignal.sellTechnicals)
  @JoinColumn({ name: 'sell_signal_id' })
  sellSignal!: SellSignal;

  @ManyToOne(() => TechnicalResource, technicalResource => technicalResource.sellTechnicals)
  @JoinColumn({ name: 'technical_resources_id' })
  technicalResource!: TechnicalResource;
}
