import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async create(): Promise<Cart> {
    const cart = this.cartRepository.create();
    return await this.cartRepository.save(cart);
  }

  async findAll(): Promise<Cart[]> {
    return await this.cartRepository.find();
  }

  async findOne(options: FindOneOptions<Cart>): Promise<Cart | null> {
    return await this.cartRepository.findOne(options);
  }

  async update(id: number, updateCartDto: UpdateCartDto): Promise<Cart> {
    const cart = await this.cartRepository.findOneBy({ id });
    if (!cart) {
      throw new NotFoundException('cart not found');
    }
    const data = { ...cart, ...updateCartDto };
    return await this.cartRepository.save(data);
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
