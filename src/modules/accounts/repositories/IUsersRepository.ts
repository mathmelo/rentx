import { UpdateResult } from 'typeorm';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

interface IUsersRepository {
  create: (data: ICreateUserDTO) => Promise<void>;
  findByEmail: (email: string) => Promise<User | null>;
  findById: (id: string) => Promise<User | null>;
  update: (user: User) => Promise<UpdateResult>;
}

export { IUsersRepository };
