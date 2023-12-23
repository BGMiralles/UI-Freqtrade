import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BuyTechnical } from "./BuyTechnical";
import { SellTechnical } from "./SellTechnical";

@Entity("technical_resources")
export class TechnicalResource extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;

  @OneToMany(
    () => BuyTechnical,
    (buyTechnical) => buyTechnical.technicalResource
  )
  buyTechnicals!: BuyTechnical[];

  @OneToMany(
    () => SellTechnical,
    (sellTechnical) => sellTechnical.technicalResource
  )
  sellTechnicals!: SellTechnical[];
}
