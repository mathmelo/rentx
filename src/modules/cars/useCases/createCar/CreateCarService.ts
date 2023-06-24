import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { HttpException } from '@shared/errors/HttpException';

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  category_id: string;
  brand: string;
}

@injectable()
class CreateCarService {
  constructor(
    @inject('CarsRepository') private carRepository: ICarsRepository
  ) {}

  async execute({
    brand,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    category_id,
  }: IRequest): Promise<Car> {
    const carAlreadyExists = await this.carRepository.findByLicensePlate(
      license_plate
    );

    if (carAlreadyExists) {
      throw new HttpException('Car already exists', 400);
    }

    const car = await this.carRepository.create({
      brand,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      category_id,
    });

    return car;
  }
}

export { CreateCarService };
