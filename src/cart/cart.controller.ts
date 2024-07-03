import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { UpdateCartDto } from './dto/update-cart.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create() {
    return this.cartService.create();
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cartService.findOne({
      where: { id },
    });
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cartService.remove(id);
  }
}
