import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  findAll() {
    return `This action returns all category`;
  }

  async findOne(id: number): Promise<Category | null> {
    return await this.categoryRepository.findOneBy({ id });
  }

  async find(options?: FindManyOptions<Category>): Promise<Category[]> {
    return await this.categoryRepository.find(options);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('category not found');
    }
    const data = { ...category, ...updateCategoryDto };

    return this.categoryRepository.save(data);
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
