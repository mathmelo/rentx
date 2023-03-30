import { inject, injectable } from 'tsyringe';
import { UpdateResult } from 'typeorm';

import { HttpException } from '../../../../errors/HttpException';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}

  async execute(file_path: string, user_id: string): Promise<UpdateResult> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new HttpException('User not found', 400);
    }

    user.avatar_path = file_path;

    const updatedUser = await this.usersRepository.update(user);

    return updatedUser;
  }
}

export { UpdateUserAvatarService };
