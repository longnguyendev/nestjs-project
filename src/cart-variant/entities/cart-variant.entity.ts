import { Expose } from 'class-transformer';
import { BaseEntity } from 'src/base/entities/base.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Variant } from 'src/variant/entities/variant.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class CartVariant extends BaseEntity {
  @Column()
  public cartId: number;

  @Column()
  public variantId: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Cart, (cart) => cart.cartVariants)
  public cart: Cart;

  @ManyToOne(() => Variant, (variant) => variant.cartVariants, { eager: true })
  public variant: Variant;

  @Expose()
  get total(): number {
    return this.quantity * this.variant.price;
  }
}
