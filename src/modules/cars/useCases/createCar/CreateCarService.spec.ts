import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { describe, it } from 'mocha';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { HttpException } from '@shared/errors/HttpException';

import { CreateCarService } from './CreateCarService';

use(chaiAsPromised);

describe('Create Car service ->', () => {
  let carRepository: CarsRepositoryInMemory;
  let createCarService: CreateCarService;

  beforeEach(() => {
    carRepository = new CarsRepositoryInMemory();
    createCarService = new CreateCarService(carRepository);
  });

  it('should be able to create a new car', async () => {
    const input = {
      brand: 'Brand',
      daily_rate: 100,
      description: 'Description Car',
      fine_amount: 60,
      license_plate: 'ABC-1234',
      name: 'Name Car',
      category_id: 'category',
    };

    const car = await createCarService.execute(input);

    expect(car).to.have.property('id');
  });

  it('should not be able to create a car with exists license plate', async () => {
    const input = {
      brand: 'Brand',
      daily_rate: 100,
      description: 'Description Car',
      fine_amount: 60,
      license_plate: 'ABC-1234',
      name: 'Name Car',
      category_id: 'category',
    };

    return expect(
      (async () => {
        await createCarService.execute({ ...input });
        await createCarService.execute({ ...input });
      })()
    ).to.eventually.be.rejected.and.be.an.instanceOf(HttpException);
  });

  it('should be able to create a car with available true by default', async () => {
    const input = {
      name: 'Available car',
      description: 'Description Car',
      brand: 'Brand',
      daily_rate: 100,
      fine_amount: 60,
      license_plate: 'ABC-3',
      category_id: 'category',
    };

    const car = await createCarService.execute(input);

    expect(car.available).to.be.true;
  });
});
