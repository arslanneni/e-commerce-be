import { EcmOrder } from 'src/orders/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('ecm_users')
export class EcmUsers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  user_id: string;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phonenumber: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'timestamp', nullable: true })
  datetime: Date;

  @Column({ type: 'timestamp', nullable: true })
  modified_datetime: Date;

  @Column({ type: 'varchar', length: 15, nullable: true })
  status: string;

  @OneToMany(() => EcmOrder, (ecmOrder) => ecmOrder.ecmUsers)
  ecmOrder: EcmOrder[];
}
