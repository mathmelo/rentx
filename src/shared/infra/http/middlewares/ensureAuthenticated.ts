import type { NextFunction, Request, Response } from 'express';
import { verify, VerifyCallback } from 'jsonwebtoken';
import { promisify } from 'util';

import jwtConfig from '@config/auth';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { HttpException } from '@shared/errors/HttpException';

interface IPayload extends VerifyCallback {
  id: string;
}

type IAsyncVerifyJWT = (token: string, key: string) => Promise<VerifyCallback>;

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new HttpException('Token not provided', 401);
  }

  const [scheme, token] = authorization.split(' ');

  if (!/^Bearer$/i.test(scheme)) {
    throw new HttpException('Token malformatted', 401);
  }

  try {
    const asyncVerifyJWT = promisify(verify) as IAsyncVerifyJWT;
    const { id } = (await asyncVerifyJWT(
      token,
      jwtConfig.JWT_SECRET
    )) as IPayload;

    request.userId = id;

    const userRepository = new UsersRepository();
    const user = await userRepository.findById(id);

    if (!user) {
      throw new HttpException('User does not exists.', 401);
    }

    return next();
  } catch (err) {
    throw new HttpException('Token is not valid.', 401);
  }
}
