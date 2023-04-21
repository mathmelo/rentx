import 'dotenv/config';
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { describe, it, beforeEach } from 'mocha';

import { HttpException } from '@errors/HttpException';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserService } from '../createUsers/CreateUserService';
import { CreateSessionService } from './CreateSessionService';

use(chaiAsPromised);

describe('Authentication Service -> ', () => {
  let usersRepository: UsersRepositoryInMemory;
  let createSessionService: CreateSessionService;
  let createUserService: CreateUserService;

  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    createSessionService = new CreateSessionService(usersRepository);
    createUserService = new CreateUserService(usersRepository);
  });

  it('should be able to create a new session', async () => {
    const input = {
      email: 'testando@email.com',
      password: '12345678',
    };

    const user: ICreateUserDTO = {
      name: 'Matheus',
      driver_license: '007',
      email: input.email,
      password: input.password,
    };

    await createUserService.execute(user);

    const result = await createSessionService.execute({
      email: input.email,
      password: input.password,
    });

    expect(result).to.have.property('token');
  });

  it('should not be able to authenticate a nonexistent user', async () => {
    const input = {
      email: 'testando@email.com',
      password: '12345678',
    };

    const user: ICreateUserDTO = {
      name: 'Matheus',
      driver_license: '007',
      email: input.email,
      password: input.password,
    };

    expect(
      createUserService.execute(user)
    ).to.eventually.be.rejected.and.be.an.instanceOf(HttpException);
  });

  it('should not be able to authenticate with incorrect password', async () => {
    const input = {
      email: 'testando@email.com',
      password: '12345678',
    };

    const user: ICreateUserDTO = {
      name: 'Matheus',
      driver_license: '007',
      email: input.email,
      password: input.password,
    };

    await createUserService.execute(user);

    expect(
      createSessionService.execute({
        email: input.email,
        password: 'incorrect password',
      })
    ).to.eventually.be.rejected.and.be.an.instanceOf(HttpException);
  });
});
