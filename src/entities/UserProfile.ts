import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Gender } from '../types';
import User from './User';

@Entity()
export default class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne(() => User)
  user!: User;

  @Column({ nullable: true, length: 120 })
  fullName!: string;

  @Column({ nullable: true })
  document!: string;

  @Column({ nullable: true, type: 'date' })
  birthday!: Date;

  @Column({ nullable: true, type: 'enum', enum: Gender, default: null })
  gender!: Gender;

  @CreateDateColumn()
  createDate!: Date;

  @UpdateDateColumn()
  updateDate!: Date;

  @DeleteDateColumn()
  deleteDate!: Date;
}
