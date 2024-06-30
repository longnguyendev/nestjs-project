import { BaseEntity } from 'src/base/entities/base.entity';
import { Variant } from 'src/variant/entities/variant.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column()
  thumbnail: string;

  @OneToMany(() => Variant, (variant) => variant.product, { eager: true })
  variants: Variant[];
}
