import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Plan from './Plan';
import PlanAccess from './PlanAccess';
import UserProfile from './UserProfile';
import Wallet from './Wallet';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false, unique: true })
  email!: string;

  @Column({ nullable: false, length: 300 })
  passwordHash!: string;

  @OneToOne(() => UserProfile, { cascade: true, eager: true })
  @JoinColumn()
  profile!: UserProfile;

  @Column({ nullable: false, default: false })
  admin!: boolean;

  @OneToMany(() => PlanAccess, (planAccess) => planAccess.user)
  plansAccess!: PlanAccess[];

  @ManyToMany(() => Plan, (plan) => plan.managers)
  @JoinTable()
  managedPlans!: Plan[];

  @ManyToMany(() => Wallet, (wallet) => wallet.managers)
  @JoinTable()
  managedWallets!: Plan[];

  @Column({ nullable: false, default: true })
  active!: boolean;

  @CreateDateColumn()
  createDate!: Date;

  @UpdateDateColumn()
  updateDate!: Date;

  @DeleteDateColumn()
  deleteDate!: Date;
}
