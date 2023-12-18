import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TechnicalResource } from "./TechnicalResource";
import { SellSignal } from "./SellSignal";

@Entity("sell_technicals")
export class SellTechnical extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true, type: "int" })
  sell_signal_id!: number | null;

  @Column({ nullable: true, type: "int"})
  technical_resources_id!: number | null;

  @ManyToOne(() => SellSignal, (sellSignal) => sellSignal.sellTechnicals)
  @JoinColumn({ name: "sell_signal_id" })
  sellSignal!: SellSignal;

  @ManyToOne(
    () => TechnicalResource,
    (technicalResource) => technicalResource.sellTechnicals
  )
  @JoinColumn({ name: "technical_resources_id" })
  technicalResource!: TechnicalResource;
}
