import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TechnicalResource } from "./TechnicalResource";

@Entity("sell_technicals")
export class SellTechnical extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  sell_signal_id!: number;

  @Column()
  technical_resources_id!: number;

}
