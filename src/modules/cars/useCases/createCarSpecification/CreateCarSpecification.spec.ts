import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { beforeEach, describe, it } from 'mocha';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { HttpException } from '@shared/errors/HttpException';

import { CreateCarSpecificationService } from './CreateCarSpecificationService';

use(chaiAsPromised);

describe('Create Car Specification', () => {
  let createCarSpecificationService: CreateCarSpecificationService;
  let carsRepositoryInMemory: CarsRepositoryInMemory;

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationService = new CreateCarSpecificationService(
      carsRepositoryInMemory
    );
  });

  it('should not be able to add a new specification to a non-existent car', async () => {
    return expect(
      (async () => {
        const car_id = '1234';
        const specifications_id = ['54321'];

        await createCarSpecificationService.execute({
          car_id,
          specifications_id,
        });
      })()
    ).to.eventually.be.rejected.and.be.an.instanceOf(HttpException);
  });

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Brand',
      daily_rate: 100,
      description: 'Description Car',
      fine_amount: 60,
      license_plate: 'ABC-1234',
      name: 'Name Car',
      category_id: 'category',
    });

    const specifications_id = ['54321'];

    await createCarSpecificationService.execute({
      car_id: car.id,
      specifications_id,
    });
  });
});
