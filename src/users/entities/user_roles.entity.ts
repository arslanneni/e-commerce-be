import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { EcmUsers } from './user.entity';

@Entity('ecm_users_roles')
export class EcmUsersRoles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  roles: string;

  @Column({ type: 'varchar', length: 255 })
  status: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  datetime: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  modified_datetime: Date | null;

  @OneToMany(() => EcmUsers, (ecmUsers) => ecmUsers.ecmUsersRoless)
  ecmUserss: EcmUsers[];
}
