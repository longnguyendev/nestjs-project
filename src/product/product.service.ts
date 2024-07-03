import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { In } from 'typeorm';
import { CategoryService } from 'src/category/category.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private categoryService: CategoryService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const categoriesResult = await this.categoryService.find({
      where: {
        id: In(createProductDto.categories),
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { categories, ...data } = createProductDto;
    const product = this.productRepository.create(data);
    product.categories = categoriesResult;
    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: number): Promise<Product | null> {
    return await this.productRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException('product not found');
    }
    const categoriesResult = await this.categoryService.find({
      where: {
        id: In(updateProductDto.categories),
      },
    });
    product.categories = categoriesResult;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { categories, ...updateData } = updateProductDto;
    const data = { ...product, ...updateData };
    const result = await this.productRepository.save(data);
    return plainToClass(Product, result);
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }
}
