import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import dayjs from 'dayjs';
import { describe, it } from 'mocha';

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { DayJsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';
import { HttpException } from '@shared/errors/HttpException';

import { CreateRentalService } from './CreateRentalService';

use(chaiAsPromised);

describe('Create Rental suit', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  let rentalsRepository: RentalsRepositoryInMemory;
  let createRentalService: CreateRentalService;
  let dayJsProvider: IDateProvider;

  beforeEach(() => {
    dayJsProvider = new DayJsDateProvider();
    rentalsRepository = new RentalsRepositoryInMemory();
    createRentalService = new CreateRentalService(
      rentalsRepository,
      dayJsProvider
    );
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalService.execute({
      car_id: '1234',
      user_id: '12543',
      expected_return_date: dayAdd24Hours,
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
          expected_return_date: dayAdd24Hours,
        });

        await createRentalService.execute({
          car_id: 'car_id_2',
          user_id: 'user_id_1',
          expected_return_date: dayAdd24Hours,
        });
      })()
    ).to.eventually.be.rejected.and.be.deep.equal(
      new HttpException('There is a rental in progress for user.', 400)
    );
  });

  it('should not be able to create two or more open rentals to the same car', async () => {
    return expect(
      (async () => {
        await createRentalService.execute({
          car_id: 'car_id_1',
          user_id: 'user_id_1',
          expected_return_date: dayAdd24Hours,
        });

        await createRentalService.execute({
          car_id: 'car_id_1',
          user_id: 'user_id_2',
          expected_return_date: dayAdd24Hours,
        });
      })()
    ).to.eventually.be.rejected.and.be.deep.equal(
      new HttpException('Car is unavailable.', 400)
    );
  });

  it('should not be able to create a new rental with invalid return time', async () => {
    return expect(
      (async () => {
        await createRentalService.execute({
          user_id: '123',
          car_id: 'test',
          expected_return_date: dayJsProvider.dateNow(),
        });
      })()
    ).to.eventually.be.rejected.and.be.deep.equal(
      new HttpException('Invalid return time', 400)
    );
  });
});
