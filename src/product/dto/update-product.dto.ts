import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsBoolean()
  public: boolean;

  @Type(() => Date)
  updatedAt: Date;
}
