import { Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { dataSource } from '@shared/infra/typeorm/data-source';

import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private carRepository: Repository<Car>;

  constructor() {
    this.carRepository = dataSource.getRepository(Car);
  }

  create(data: ICreateCarDTO): Promise<void> {
    console.log(data);
    throw new Error('Method not implemented.');
  }

  findByLicensePlate(license_plate: string): Promise<Car> {
    throw new Error('Method not implemented.');
  }
}

export { CarsRepository };
