import { BaseEntity } from 'src/base/entities/base.entity';
import { CartVariant } from 'src/cart-variant/entities/cart-variant.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class Cart extends BaseEntity {
  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn() // specify inverse side as a second parameter
  user: User;

  @OneToMany(() => CartVariant, (variantCart) => variantCart.cart)
  cartVariants: CartVariant[];
}
