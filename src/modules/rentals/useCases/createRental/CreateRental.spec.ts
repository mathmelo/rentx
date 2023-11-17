import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { describe, it } from 'mocha';

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { HttpException } from '@shared/errors/HttpException';

import { CreateRentalService } from './CreateRentalService';

use(chaiAsPromised);

describe('Create Rental suit', () => {
  let rentalsRepository: RentalsRepositoryInMemory;
  let createRentalService: CreateRentalService;

  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory();
    createRentalService = new CreateRentalService(rentalsRepository);
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalService.execute({
      car_id: '1234',
      user_id: '12543',
      expected_return_date: new Date(),
    });

    expect(rental).to.have.property('id');
    expect(rental).to.have.property('start_date');
  });

  it('should not be able to create two or more open rentals to the same user', async () => {
    return expect(
      (async () => {
        await createRentalService.execute({
          car_id: 'car_id_1',
          user_id: 'user_id_1',
          expected_return_date: new Date(),
        });

        await createRentalService.execute({
          car_id: 'car_id_2',
          user_id: 'user_id_1',
          expected_return_date: new Date(),
        });
      })()
    ).to.eventually.be.rejected.and.be.an.instanceOf(HttpException);
  });

  it('should not be able to create two or more open rentals to the same car', async () => {
    return expect(
      (async () => {
        await createRentalService.execute({
          car_id: 'car_id_1',
          user_id: 'user_id_1',
          expected_return_date: new Date(),
        });

        await createRentalService.execute({
          car_id: 'car_id_1',
          user_id: 'user_id_2',
          expected_return_date: new Date(),
        });
      })()
    ).to.eventually.be.rejected.and.be.an.instanceOf(HttpException);
  });
});
