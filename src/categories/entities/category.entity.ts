import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ecm_categories')
export class EcmCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ name: 'datetime', type: 'timestamp' })
  datetime: Date;

  @UpdateDateColumn({
    name: 'modified_datetime',
    type: 'timestamp',
    nullable: true,
  })
  modified_datetime: Date;

  @Column({ type: 'varchar', length: 15, nullable: true })
  status: string;
}