import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("strategies")
export class Strategy extends BaseEntity{
    @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  user_id!: number;

  @Column()
  buy_signal_id!: number;

  @Column()
  sell_signal_id!: number;

  @Column()
  time_frame_id!: number;

  @Column()
  pair_id!: number;
  
  @Column()
  created_at!: Date
  
  @Column()
  updated_at!: Date

}
