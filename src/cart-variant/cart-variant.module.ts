import { Module } from '@nestjs/common';
import { CartVariantService } from './cart-variant.service';
import { CartVariantController } from './cart-variant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartVariant } from './entities/cart-variant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartVariant])],
  controllers: [CartVariantController],
  providers: [CartVariantService],
  exports: [CartVariantService],
})
export class CartVariantModule {}
