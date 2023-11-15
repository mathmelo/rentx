import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { describe, it } from 'mocha';

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';

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
    await createRentalService.execute({
      car_id: '1234',
      user_id: '12543',
      expected_return_date: new Date(),
    });
  });
});
