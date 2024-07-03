import { Module, forwardRef } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './entities/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cart]), forwardRef(() => UserModule)],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
