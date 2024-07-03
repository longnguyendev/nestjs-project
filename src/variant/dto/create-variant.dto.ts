import { IsEnum, IsNotEmpty, IsNumber, Length, Min } from 'class-validator';
import { sizes } from '../entities/variant.entity';
import { Type } from 'class-transformer';

export class CreateVariantDto {
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @IsNotEmpty()
  @IsEnum(sizes)
  size: sizes;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  quantity: number;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  price: number;
}
