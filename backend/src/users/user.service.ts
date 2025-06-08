import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { encrypt } from './secure/encrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async create(createDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = createDto.firstName;
    user.lastName = createDto.lastName;
    user.email = createDto.email.toLowerCase();
    user.password = await encrypt(createDto.password);
    await this.usersRepository.save(user);
    return user;
  }
}
