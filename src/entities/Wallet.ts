import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Plan from './Plan';
import Recommendation from './Recommendation';
import User from './User';

@Entity()
export default class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: true, type: 'text' })
  description!: string;

  @ManyToMany(() => Plan, (plan) => plan.wallets)
  @JoinTable()
  plans!: Plan[];

  @OneToMany(() => Recommendation, (recommendation) => recommendation.wallet, {
    eager: true,
  })
  recommendations!: Recommendation[];

  @ManyToMany(() => User, (user) => user.managedWallets, { eager: true })
  @JoinTable()
  managers!: User[];

  @CreateDateColumn()
  createDate!: Date;

  @UpdateDateColumn()
  updateDate!: Date;

  @DeleteDateColumn()
  deleteDate!: Date;
}
