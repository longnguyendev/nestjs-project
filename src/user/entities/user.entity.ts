import { Exclude, Expose } from 'class-transformer';
import { BaseEntity } from 'src/base/entities/base.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  avatar: string;

  @Column()
  @Exclude()
  password: string;

  @OneToOne(() => Cart, (cart) => cart.user) // specify inverse side as a second parameter
  cart: Cart;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
