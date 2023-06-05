import { describe, it } from 'mocha';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { CreateCarService } from './CreateCarService';

describe('Create Car Suite', () => {
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

    await createCarService.execute(input);
  });
});
