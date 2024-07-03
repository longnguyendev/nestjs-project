import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Request,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { CartVariantService } from 'src/cart-variant/cart-variant.service';
import { CartService } from 'src/cart/cart.service';
import { CreateCartVariantDto } from 'src/cart-variant/dto/create-cart-variant.dto';
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cartVariantService: CartVariantService,
    @Inject(forwardRef(() => CartService))
    private readonly cartService: CartService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  async getUser(@Request() req): Promise<User> {
    const id = Number(req.user.sub);
    return await this.userService.findOne({
      where: { id },
    });
  }

  @Patch()
  @UseGuards(AuthGuard)
  async update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    console.log(req.user);
    const id = Number(req.user.sub);
    const user = await this.userService.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    console.log(updateUserDto);
    const data = { ...user, ...updateUserDto };
    return await this.userService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @UseGuards(AuthGuard)
  @Get('cart')
  async getCart(@Request() req) {
    const cartId = Number(req.user.cartId);
    const cart = await this.cartService.findOne({
      where: { id: cartId },
      relations: {
        cartVariants: {
          variant: true,
        },
      },
    });
    return cart;
  }

  @UseGuards(AuthGuard)
  @Patch('cart')
  async updateCart(
    @Request() req,
    @Body() createCartVariantDto: CreateCartVariantDto,
  ) {
    console.log(createCartVariantDto);

    const cart = await this.getCart(req);
    const cartVariants = cart.cartVariants;
    //find cartVariant
    const cartVariant = cartVariants.find(
      (cartVariant) => cartVariant.variantId === createCartVariantDto.variantId,
    );
    //check cartVariant is exist
    if (cartVariant) {
      //if exist update varian quantity
      return await this.cartVariantService.update(
        cartVariant.id,
        createCartVariantDto,
      );
    } else {
      //if not exist add new cartVarian with card id
      return await this.cartVariantService.create({
        cartId: cart.id,
        ...createCartVariantDto,
      });
    }
  }
}
