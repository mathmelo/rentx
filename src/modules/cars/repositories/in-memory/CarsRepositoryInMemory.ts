import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarDTO) {
    const car = new Car();

    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string) {
    const car = this.cars.find((car) => car.license_plate === license_plate);

    return car;
  }

  async findAvailable(category_id?: string, brand?: string, name?: string) {
    const allAvailableCars = this.cars.filter((car) => car.available === true);

    if (!category_id && !brand && !name) return allAvailableCars;

    const filters = Object.entries({ category_id, brand, name }).filter(
      (v) => v[1] !== undefined
    );

    return allAvailableCars.filter((car) => {
      return filters.every(([key, value]) => car[key] === value);
    });
  }
}
