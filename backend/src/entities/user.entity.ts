import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 55, name: 'first_name' })
  firstName: string;

  @Column({ type: 'varchar', length: 55, name: 'last_name' })
  lastName: string;

  @Column({ type: 'varchar', length: 55, unique: true })
  email: string;

  @Column('text')
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
