import { Module } from '@nestjs/common';
import { VariantService } from './variant.service';
import { VariantController } from './variant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variant } from './entities/variant.entity';
import { FileModule } from 'src/file/file.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Variant]), FileModule, ProductModule],
  controllers: [VariantController],
  providers: [VariantService],
})
export class VariantModule {}
