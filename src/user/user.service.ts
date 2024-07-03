import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CartService } from 'src/cart/cart.service';
import { plainToClass } from 'class-transformer';

const saltOrRounds = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(forwardRef(() => CartService))
    private cartService: CartService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (user) {
      throw new ConflictException('user already exits');
    }
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hash,
    });
    const cart = await this.cartService.create();
    newUser.cart = cart;
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async find(options: FindManyOptions<User>): Promise<User[]> {
    return await this.userRepository.find(options);
  }

  async findOne(options: FindOneOptions<User>) {
    return await this.userRepository.findOne(options);
  }
  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException();
    }
    const data = { ...user, ...updateUserDto };
    const result = await this.userRepository.save(data);
    //sync with class-transformer
    return plainToClass(User, result);
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
