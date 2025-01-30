import { EcmOrder } from 'src/orders/entities/order.entity';
import { EcmUsers } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ecm_shipping')
export class EcmShipping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'order_id', type: 'int', nullable: false })
  order_id: number;

  @Column({ name: 'user_id', type: 'int', nullable: false })
  user_id: number;

  @Column({ type: 'text', nullable: false })
  address: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  city: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  state: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  postalcode: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  country: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  shipping_status: string;

  @Column({ type: 'timestamp', nullable: true })
  shipping_date: Date;

  @UpdateDateColumn({ name: 'modified_datetime' })
  modified_datetime: Date;

  @ManyToOne(() => EcmOrder, (ecmOrder) => ecmOrder.ecmShippings)
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'id' }])
  ecmOrderr: EcmOrder;

  @ManyToOne(() => EcmUsers, (ecmUser) => ecmUser.ecmShippings)
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'id' }])
  ecmUserss: EcmUsers;
}
