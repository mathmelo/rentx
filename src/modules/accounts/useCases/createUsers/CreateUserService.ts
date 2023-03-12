import { inject } from 'tsyringe';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';

class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}

  async execute({
    username,
    driver_license,
    email,
    name,
    password,
  }: ICreateUserDTO) {
    await this.userRepository.create({
      username,
      driver_license,
      email,
      name,
      password,
    });
  }
}

export { CreateUserService };
