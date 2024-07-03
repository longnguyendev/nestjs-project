import { IsNotEmpty, Length } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @IsNotEmpty()
  description: string;

  thumbnail: string;

  categories: number[];
}
