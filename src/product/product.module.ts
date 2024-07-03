import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { FileModule } from 'src/file/file.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), FileModule, CategoryModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
