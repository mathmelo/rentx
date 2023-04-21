import { UpdateResult } from 'typeorm';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({ driver_license, email, name, password }: ICreateUserDTO) {
    const user = new User();

    Object.assign(user, {
      driver_license,
      email,
      name,
      password,
    });

    await this.users.push(user);
  }

  async findByEmail(email: string) {
    const user = await this.users.find((user) => user.email === email);

    return user;
  }

  async findById(id: string) {
    const user = await this.users.find((user) => user.id === id);

    return user;
  }
  update: (user: User) => Promise<UpdateResult>;
}

export { UsersRepositoryInMemory };
