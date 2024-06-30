import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
// import { UpdateFileDto } from './dto/update-file.dto';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  async create(createFileDto: CreateFileDto): Promise<File> {
    const file = this.fileRepository.create(createFileDto);
    return await this.fileRepository.save(file);
  }

  async findAll(): Promise<File[]> {
    const files = await this.fileRepository.find({
      relations: {
        variant: true,
      },
    });
    return files;
  }

  async findOne(id: number): Promise<File | null> {
    return this.fileRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return await this.fileRepository.delete(id);
  }
}
