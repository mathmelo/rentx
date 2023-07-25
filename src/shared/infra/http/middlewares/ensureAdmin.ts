import type { Request, Response, NextFunction } from 'express';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { HttpException } from '@shared/errors/HttpException';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const id = request.userId;

  const userRepository = new UsersRepository();
  const user = await userRepository.findById(id);

  if (!user.isAdmin) {
    throw new HttpException('User is not an admin', 401);
  }

  next();
}
