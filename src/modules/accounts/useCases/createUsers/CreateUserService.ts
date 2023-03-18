import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    username,
    driver_license,
    email,
    name,
    password,
  }: ICreateUserDTO) {
    await this.usersRepository.create({
      username,
      driver_license,
      email,
      name,
      password,
    });
  }
}

export { CreateUserService };
