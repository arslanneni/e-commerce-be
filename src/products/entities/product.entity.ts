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
import { EcmCategory } from '../../categories/entities/category.entity';
import { EcmOrderItem } from 'src/order-items/entities/order-item.entity';

@Entity('ecm_products')
export class EcmProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  category_id: number;

  @Column({ type: 'int', nullable: false })
  stock_quantity: number;

  @CreateDateColumn({ name: 'datetime', type: 'timestamp' })
  datetime: Date;

  @UpdateDateColumn({ name: 'modified_datetime', type: 'timestamp' })
  modified_datetime: Date;

  @Column({ type: 'varchar', length: 15, nullable: true })
  status?: string;

  @ManyToOne(() => EcmCategory, (ecmCategory) => ecmCategory.ecmProducts)
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: EcmCategory;

  @OneToMany(() => EcmOrderItem, (ecmOrderItem) => ecmOrderItem.ecmProducts)
  ecmOrderItems: EcmOrderItem[];
}
