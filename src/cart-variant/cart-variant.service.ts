import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartVariantDto } from './dto/create-cart-variant.dto';
import { UpdateCartVariantDto } from './dto/update-cart-variant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartVariant } from './entities/cart-variant.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CartVariantService {
  constructor(
    @InjectRepository(CartVariant)
    private cartVariantRepository: Repository<CartVariant>,
  ) {}

  async create(createCartVariantDto: CreateCartVariantDto) {
    const cartVariant = this.cartVariantRepository.create(createCartVariantDto);
    console.log({ cartVariant });
    const { id } = await this.cartVariantRepository.save(cartVariant);
    return this.cartVariantRepository.findOneBy({ id });
  }

  async findAll(): Promise<CartVariant[]> {
    return await this.cartVariantRepository.find();
  }

  async findOne(id: number): Promise<CartVariant | null> {
    return await this.cartVariantRepository.findOneBy({ id });
  }

  async update(id: number, updateCartVariantDto: UpdateCartVariantDto) {
    const cartVariant = await this.cartVariantRepository.findOneBy({ id });
    if (!cartVariant) {
      throw new NotFoundException('cartVariant not found');
    }
    const data = { ...cartVariant, ...updateCartVariantDto };
    const result = await this.cartVariantRepository.save(data);
    //sync with class-transformer
    return plainToClass(CartVariant, result);
  }

  remove(id: number) {
    return `This action removes a #${id} cartVariant`;
  }
}
