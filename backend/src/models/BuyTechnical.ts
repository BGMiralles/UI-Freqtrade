import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BuySignal } from "./BuySignal";
import { TechnicalResource } from "./TechnicalResource";

@Entity("buy_technicals")
export class BuyTechnical extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true, type: "int"})
  buy_signal_id!: number | null;

  @Column({ nullable: true, type: "int"})
  technical_resources_id!: number | null;

  @ManyToOne(() => BuySignal, (buySignal) => buySignal.buyTechnicals)
  @JoinColumn({ name: "buy_signal_id" })
  buySignal!: BuySignal;

  @ManyToOne(
    () => TechnicalResource,
    (technicalResource) => technicalResource.buyTechnicals
  )
  @JoinColumn({ name: "technical_resources_id" })
  technicalResource!: TechnicalResource;
}
