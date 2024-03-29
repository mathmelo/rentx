import bcrypt from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { HttpException } from '@shared/errors/HttpException';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ driver_license, email, name, password }: ICreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new HttpException('User already exists.', 400);
    }

    const hashPassword = await bcrypt.hash(password, 8);

    await this.usersRepository.create({
      driver_license,
      email,
      name,
      password: hashPassword,
    });
  }
}

export { CreateUserService };
