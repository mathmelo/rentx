import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { CreateCarService } from '../createCar/CreateCarService';
import { ListAvailableCarsService } from './ListAvailableCarsService';

describe('List available cars service', () => {
  let listCarsService: ListAvailableCarsService;
  let carsRepository: CarsRepositoryInMemory;
  let createCarService: CreateCarService;

  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    listCarsService = new ListAvailableCarsService(carsRepository);
    createCarService = new CreateCarService(carsRepository);
  });

  it('should be able to list all available cars', async () => {
    const car = await createCarService.execute({
      name: 'Available car',
      description: 'Description Car',
      brand: 'Brand',
      daily_rate: 100,
      fine_amount: 60,
      license_plate: 'ABC-3',
      category_id: 'category',
    });

    const cars = await listCarsService.execute({});

    expect(cars).to.be.deep.equal([car]);
  });

  it('should be able to list all available cars by category', async () => {
    const car = await createCarService.execute({
      name: 'Available car',
      description: 'Description Car',
      brand: 'Brand',
      daily_rate: 100,
      fine_amount: 60,
      license_plate: 'ABC-3',
      category_id: 'category1',
    });

    const cars = await listCarsService.execute({
      category_id: car.category_id,
    });

    expect(cars).to.be.deep.equal([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await createCarService.execute({
      name: 'Available car',
      description: 'Description Car',
      brand: 'Brand',
      daily_rate: 100,
      fine_amount: 60,
      license_plate: 'ABC-3',
      category_id: 'category2',
    });

    const cars = await listCarsService.execute({
      name: car.name,
    });

    expect(cars).to.be.deep.equal([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await createCarService.execute({
      name: 'Available car',
      description: 'Description Car',
      brand: 'Brand',
      daily_rate: 100,
      fine_amount: 60,
      license_plate: 'ABC-3',
      category_id: 'category3',
    });

    const cars = await listCarsService.execute({
      brand: car.brand,
    });

    expect(cars).to.be.deep.equal([car]);
  });
});
