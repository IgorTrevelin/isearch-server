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
import Plan from './Plan';
import User from './User';

@Entity()
export default class PlanAccess {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.plansAccess, { eager: true })
  @JoinColumn()
  user!: User;

  @ManyToOne(() => Plan, (plan) => plan.access, { eager: true })
  @JoinColumn()
  plan!: Plan;

  @Column({
    nullable: false,
    type: 'datetime',
  })
  startDate!: Date;

  @Column({ nullable: false, type: 'datetime' })
  endDate!: Date;

  @Column({ nullable: false, default: true })
  active!: boolean;

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;

  @DeleteDateColumn()
  deletedDate!: Date;
}
