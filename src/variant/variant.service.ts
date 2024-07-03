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
  ): Promise<Variant> {
    console.log(createVariantDto);
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
    return await this.variantRepository.save(variant);
  }

  findAll() {
    return `This action returns all variant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} variant`;
  }

  async update(
    id: number,
    updateVariantDto: UpdateVariantDto,
  ): Promise<Variant> {
    const variant = await this.variantRepository.findOneBy({ id });
    if (!variant) {
      throw new NotFoundException('variant not found');
    }
    const data = { ...variant, ...updateVariantDto };
    return await this.variantRepository.save(data);
  }

  remove(id: number) {
    return `This action removes a #${id} variant`;
  }
}
