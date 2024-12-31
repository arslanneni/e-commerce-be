import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { EcmProduct } from '../../products/entities/product.entity';
@Entity('ecm_categories')
export class EcmCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'category_id', type: 'int', nullable: false })
  category_id: number;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @CreateDateColumn({ name: 'datetime', type: 'timestamp' })
  datetime: Date;

  @UpdateDateColumn({ name: 'modified_datetime', type: 'timestamp' })
  modifiedDatetime: Date;

  @Column({ type: 'varchar', length: 15, nullable: true })
  status?: string;

  @OneToMany(() => EcmProduct, (ecmProduct) => ecmProduct.category)
  ecmProducts: EcmProduct[];
}
