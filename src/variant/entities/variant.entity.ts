import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/base/entities/base.entity';
import { CartVariant } from 'src/cart-variant/entities/cart-variant.entity';
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
  public productId: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: sizes,
  })
  size: sizes;

  @Exclude()
  @Column({ default: 0, nullable: false })
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => Product, (product) => product.variants)
  product: Product;

  @OneToMany(() => File, (file) => file.variant)
  images: File[];

  @OneToMany(() => CartVariant, (cartVariant) => cartVariant.variant)
  public cartVariants: CartVariant[];
}
