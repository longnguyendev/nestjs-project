import { BaseEntity } from 'src/base/entities/base.entity';
import { Category } from 'src/category/entities/category.entity';
import { Variant } from 'src/variant/entities/variant.entity';
import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column()
  thumbnail: string;

  @Column({ default: false })
  public: boolean;

  @OneToMany(() => Variant, (variant) => variant.product, { eager: true })
  variants: Variant[];

  @ManyToMany(() => Category, { eager: true })
  @JoinTable()
  categories: Category[];
}
