import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { CreateFileDto } from 'src/file/dto/create-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Variant } from './entities/variant.entity';
import { Repository } from 'typeorm';
import { FileService } from 'src/file/file.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class VariantService {
  constructor(
    @InjectRepository(Variant)
    private variantRepository: Repository<Variant>,
    private readonly fileService: FileService,
    private readonly productService: ProductService,
  ) {}

  async create(
    createVariantDto: CreateVariantDto,
    createFilesDto: CreateFileDto[],
  ) {
    const product = await this.productService.findOne(
      createVariantDto.productId,
    );
    if (!product) {
      throw new NotFoundException('product not found');
    }

    const files = await Promise.all(
      createFilesDto.map(async (fileDto) => {
        return this.fileService.create(fileDto);
      }),
    );
    const variant = this.variantRepository.create(createVariantDto);
    product.variants.push(variant);
    variant.images = files;
    this.productService.update(product.id, product);
    return await this.variantRepository.save(variant);
  }

  findAll() {
    return `This action returns all variant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} variant`;
  }

  update(id: number, updateVariantDto: UpdateVariantDto) {
    const variant = this.variantRepository.findOneBy({ id });
    if (!variant) {
      throw new NotFoundException('variant not found');
    }
    return this.variantRepository.save({ ...variant, ...updateVariantDto });
  }

  remove(id: number) {
    return `This action removes a #${id} variant`;
  }
}
