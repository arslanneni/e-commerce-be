import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EcmOrder } from '../../orders/entities/order.entity'; // Adjust the path as needed
import { EcmProduct } from '../../products/entities/product.entity'; // If you have a Product entity

@Entity('ecm_order_items')
export class EcmOrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  product_id: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price_per_unit: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_price: number;

  @ManyToOne(() => EcmOrder, (ecmOrder) => ecmOrder.ecmOrderItems)
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'id' }])
  ecmOrders: EcmOrder;

  @ManyToOne(() => EcmProduct, (ecmProduct) => ecmProduct.ecmOrderItems)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  ecmProducts: EcmProduct;
}
