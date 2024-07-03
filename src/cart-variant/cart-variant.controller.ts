import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartVariantService } from './cart-variant.service';
import { CreateCartVariantDto } from './dto/create-cart-variant.dto';
import { UpdateCartVariantDto } from './dto/update-cart-variant.dto';

@Controller('cart-variant')
export class CartVariantController {
  constructor(private readonly cartVariantService: CartVariantService) {}

  @Post()
  create(@Body() createCartVariantDto: CreateCartVariantDto) {
    return this.cartVariantService.create(createCartVariantDto);
  }

  @Get()
  findAll() {
    return this.cartVariantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartVariantService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCartVariantDto: UpdateCartVariantDto,
  ) {
    return this.cartVariantService.update(+id, updateCartVariantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartVariantService.remove(+id);
  }
}
