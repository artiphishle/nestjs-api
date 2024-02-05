import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    return this.repo.create({ email, password }).save();
  }

  findOne(id: FindOneOptions<User>) {
    return this.repo.findOne(id);
  }

  find(email: FindManyOptions<User>) {
    return this.repo.find(email);
  }

  async update(id: FindOneOptions<User>, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) throw new Error('user not found');
    return this.repo.save(Object.assign(user, attrs));
  }

  async remove(id: FindOneOptions<User>) {
    const user = await this.findOne(id);
    if (!id) throw new Error('user not found');
    return this.repo.remove(user);
  }
}
