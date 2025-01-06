import { EcmOrderItem } from 'src/order-items/entities/order-item.entity';
import { EcmUsers } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('ecm_orders')
export class EcmOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  order_status: string;

  @Column({ type: 'int', nullable: false })
  total_amount: number;

  @CreateDateColumn({ name: 'order_date', type: 'timestamp' })
  order_date: Date;

  @UpdateDateColumn({ name: 'modified_datetime', type: 'timestamp' })
  modified_datetime: Date;

  @ManyToOne(() => EcmUsers, (ecmUser) => ecmUser.ecmOrder)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  ecmUsers: EcmUsers;

  @OneToMany(() => EcmOrderItem, (ecmOrderItem) => ecmOrderItem.ecmOrders)
  ecmOrderItems: EcmOrderItem[];
}
