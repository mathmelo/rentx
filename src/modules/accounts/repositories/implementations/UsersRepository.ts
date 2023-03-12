import { Repository } from 'typeorm';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  async create(data: ICreateUserDTO): Promise<void> {
    const { name, email, password, username, driver_license } = data;

    const user = this.repository.create({
      email,
      name,
      username,
      password,
      driver_license,
    });

    await this.repository.save(user);
  }
}

export { UsersRepository };
