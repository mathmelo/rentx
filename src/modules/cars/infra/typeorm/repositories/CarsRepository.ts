import { Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { dataSource } from '@shared/infra/typeorm/data-source';

import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = dataSource.getRepository(Car);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifications,
      id,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOneBy({
      license_plate,
    });

    return car;
  }

  async findAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]> {
    const carQuery = this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true });

    if (brand) {
      carQuery.andWhere('c.brand = :brand', { brand });
    }

    if (category_id) {
      carQuery.andWhere('c.category_id = :category_id', { category_id });
    }

    if (name) {
      carQuery.andWhere('c.name = :name', { name });
    }

    const allAvailableCars = await carQuery.getMany();

    return allAvailableCars;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOneBy({ id });

    return car;
  }
}

export { CarsRepository };
