import { BaseEntity } from 'src/base/entities/base.entity';
import { Variant } from 'src/variant/entities/variant.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class File extends BaseEntity {
  @Column()
  fieldname: string;

  @Column()
  originalname: string;

  @Column()
  encoding: string;

  @Column()
  mimetype: string;

  @Column()
  destination: string;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  size: number;

  @ManyToOne(() => Variant, (variant) => variant.images)
  variant: Variant;
}
