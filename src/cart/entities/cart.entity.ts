import { EcmProduct } from 'src/products/entities/product.entity';
import { EcmUsers } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('ecm_cart')
export class EcmCart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', type: 'int', nullable: false })
  user_id: number;

  @Column({ name: 'status', type: 'varchar', nullable: false })
  status: string;

  @Column({ name: 'product_id', type: 'int', nullable: false })
  product_id: number;

  @ManyToOne(() => EcmUsers, (ecmUser) => ecmUser.ecmCartss)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  ecmUserss: EcmUsers;

  @ManyToOne(() => EcmProduct, (ecmProduct) => ecmProduct.ecmCartss)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  ecmProducts: EcmProduct;

  @Column({ type: 'int', nullable: false })
  quantity: number;
}
