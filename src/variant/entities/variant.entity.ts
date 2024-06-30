import { BaseEntity } from 'src/base/entities/base.entity';
import { File } from 'src/file/entities/file.entity';
import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

export enum sizes {
  s = 's',
  m = 'm',
  l = 'l',
  xl = 'xl',
}

@Entity()
export class Variant extends BaseEntity {
  @Column()
  name: string;

  @Column()
  size: sizes;

  @ManyToOne(() => Product, (product) => product.variants)
  product: Product;

  @OneToMany(() => File, (file) => file.variant, { eager: true })
  images: File[];
}
