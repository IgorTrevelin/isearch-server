import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Wallet from './Wallet';

@Entity()
export default class Recommendation {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false, length: 15 })
  code!: string;

  @Column({ nullable: false, type: 'date' })
  since!: Date;

  @Column({ nullable: false, type: 'date' })
  until!: Date;

  @ManyToOne(() => Wallet, (wallet) => wallet.recommendations)
  @JoinColumn()
  wallet!: Wallet;

  @Column({ nullable: false, default: false })
  active!: boolean;

  @CreateDateColumn()
  createDate!: Date;

  @UpdateDateColumn()
  updateDate!: Date;

  @DeleteDateColumn()
  deleteDate!: Date;
}
