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
import PlanAccess from './PlanAccess';
import User from './User';
import Wallet from './Wallet';

@Entity()
export default class Plan {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false, length: 300 })
  name!: string;

  @Column({ nullable: true, type: 'text' })
  description!: string;

  @OneToMany(() => PlanAccess, (planAccess) => planAccess.plan)
  access!: PlanAccess[];

  @ManyToMany(() => User, (user) => user.managedPlans, { eager: true })
  @JoinTable()
  managers!: User[];

  @ManyToMany(() => Wallet, (wallet) => wallet.plans, { eager: true })
  @JoinTable()
  wallets!: Wallet[];

  @CreateDateColumn()
  createDate!: Date;

  @UpdateDateColumn()
  updateDate!: Date;

  @DeleteDateColumn()
  deleteDate!: Date;
}
