import { inject, injectable } from 'tsyringe';

import { HttpException } from '../../../../errors/HttpException';
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

    await this.usersRepository.create({
      driver_license,
      email,
      name,
      password,
    });
  }
}

export { CreateUserService };
