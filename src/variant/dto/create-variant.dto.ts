import { IsNotEmpty } from 'class-validator';
import { sizes } from '../entities/variant.entity';

export class CreateVariantDto {
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  size: sizes;
}
