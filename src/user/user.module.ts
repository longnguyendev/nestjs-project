import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from 'src/cart/cart.module';
import { CartVariantModule } from 'src/cart-variant/cart-variant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => CartModule),
    CartVariantModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
