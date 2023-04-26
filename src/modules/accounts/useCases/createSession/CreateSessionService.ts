import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import jwtConfig from '@config/auth';
import { HttpException } from '@shared/errors/HttpException';

import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    email: string;
    name: string;
  };
  token: string;
}

@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new HttpException('User does not exists.', 400);
    }

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      throw new HttpException('Email or password incorrect.', 400);
    }

    const { id, name } = user;

    return {
      user: {
        email,
        name,
      },
      token: sign({ id }, jwtConfig.JWT_SECRET, {
        expiresIn: jwtConfig.EXPIRES_IN,
      }),
    };
  }
}

export { CreateSessionService };
